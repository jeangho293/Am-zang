import { Inject } from 'typedi';
import { DddContext } from './ddd-context';

export abstract class DddService {
  @Inject()
  context!: DddContext;
}
