import { Service } from 'typedi';
import { S3Client as AwsS3, PutObjectCommand } from '@aws-sdk/client-s3';

@Service()
export class S3Client {
  private _s3Client?: AwsS3;

  private get s3Client() {
    if (!this._s3Client) {
      this._s3Client = new AwsS3({
        region: 'us-east-1',
        endpoint: 'http://localhost:4566',
        forcePathStyle: true,
        credentials: {
          accessKeyId: 'test',
          secretAccessKey: 'test',
        },
      });
    }

    return this._s3Client;
  }

  public s3 = {
    upload: async (buffer: Buffer, type: string) => {
      const key = `uploads/${Date.now()}`;
      const s3Object = new PutObjectCommand({
        Bucket: 'anogle',
        Key: key,
        Body: Buffer.from(buffer),
        ContentType: type,
      });
      const {
        $metadata: { requestId },
      } = await this.s3Client.send(s3Object);
      return { key, requestId };
    },
  };
}
