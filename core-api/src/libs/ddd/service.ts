import { Inject } from '@nestjs/common';
import { AsyncContext } from '../async-context';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EventStoreService } from '../event-store';

export abstract class DddService {
  @Inject()
  context: AsyncContext;

  @InjectEntityManager()
  private entityManager: EntityManager;

  @Inject()
  private eventStore: EventStoreService;
}
