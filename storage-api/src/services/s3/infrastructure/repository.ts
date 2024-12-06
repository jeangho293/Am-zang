import { Service } from 'typedi';
import { DddRepository } from '../../../libs/ddd';
import { S3Object } from '../domain/model';

@Service()
export class S3ObjectRepository extends DddRepository<S3Object> {
  entityClass = S3Object;
}
