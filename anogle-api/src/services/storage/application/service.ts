import { Inject, Service } from 'typedi';
import { DddService, Transactional } from '@libs/ddd';
import { StorageClient } from '@libs/storage';

@Service()
export class StorageService extends DddService {
  constructor(@Inject() private storageClient: StorageClient) {
    super();
  }

  @Transactional()
  async upload(value: any) {
    return this.storageClient.api.upload(value);
  }
}
