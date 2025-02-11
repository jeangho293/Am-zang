import { Inject } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Kafka } from 'kafkajs';
import { KafkaService } from '../kafka/kafka.service';

export abstract class DddService {
  @InjectEntityManager()
  entityManager: EntityManager;

  @Inject()
  kafkaService: KafkaService;
}
