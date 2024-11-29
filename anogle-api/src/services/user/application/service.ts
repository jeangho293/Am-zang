import { Service } from 'typedi';
import { DddService } from '../../../libs/ddd/ddd-service';

@Service()
export class UserService extends DddService {
  async list() {
    return this;
  }
}
