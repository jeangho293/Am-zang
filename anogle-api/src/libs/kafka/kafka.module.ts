import { Global, Module } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { KafkaService } from './kafka.service';

@Global()
@Module({
  providers: [
    {
      provide: 'KAFKA_CLIENT',
      useFactory: () => {
        return new Kafka({
          clientId: 'my-app',
          brokers: ['localhost:9094'],
        });
      },
    },
    KafkaService,
  ],
  exports: ['KAFKA_CLIENT', KafkaService],
})
export class KafkaModule {}
