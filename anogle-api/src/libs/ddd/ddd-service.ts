import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

export abstract class DddService {
  @InjectEntityManager()
  entityManager: EntityManager;
}
