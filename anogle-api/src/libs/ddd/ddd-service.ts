import { Inject, Service } from 'typedi';
import { DddContext } from './ddd-context';

@Service()
export abstract class DddService {
  @Inject()
  context!: DddContext;
}
