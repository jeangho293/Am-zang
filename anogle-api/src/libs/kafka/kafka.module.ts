import { Global, Module, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { KafkaProducerService } from './producer.module';
import { KafkaConsumerService } from './consumer.module';

@Global()
@Module({
  providers: [
    KafkaConsumerService,
    KafkaProducerService,

    {
      provide: 'KAFKA_CLIENT',
      useFactory: () => {
        return new Kafka({ brokers: ['localhost:9094'] });
      },
    },
  ],
  exports: ['KAFKA_CLIENT', KafkaConsumerService, KafkaProducerService],
})
export class KafkaModule implements OnModuleInit {
  constructor(private readonly kafkaConsumerService: KafkaConsumerService) {}

  async onModuleInit() {
    await this.kafkaConsumerService.start();
  }
}
