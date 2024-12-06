import { Inject, Service } from 'typedi';
import { DddService } from '../../../libs/ddd';
import { S3Client } from '../../../libs/s3';
import { S3Object } from '../domain/model';
import { S3ObjectRepository } from '../infrastructure/repository';

@Service()
export class S3Service extends DddService {
  constructor(
    @Inject() private s3Client: S3Client,
    @Inject() private s3ObjectRepository: S3ObjectRepository
  ) {
    super();
  }

  async upload(buffer: Buffer, type: string) {
    const { key, requestId } = await this.s3Client.s3.upload(buffer, type);

    const s3Object = new S3Object({
      key,
      requestId,
    });

    await this.s3ObjectRepository.save([s3Object]);
    return { id: s3Object.id };
  }
}
