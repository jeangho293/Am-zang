import { Service } from 'typedi';
import { DddService } from '@libs/ddd';

@Service()
export class UserService extends DddService {
  async list() {
    return this;
  }
}
