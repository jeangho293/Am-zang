import { Inject, Injectable } from '@nestjs/common';
import type { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class KafkaConsumerService {
  private readonly consumer: Consumer;

  constructor(@Inject('KAFKA_CLIENT') private readonly kafka: Kafka) {
    this.consumer = this.kafka.consumer({ groupId: 'anole_api' });
  }

  async start() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'ddd_event', fromBeginning: false });

    await this.consumer.run({
      eachMessage: async ({ message, topic }) => {
        if (message.value && message.key) {
          const key = message.key.toString();
          const value = JSON.parse(message.value.toString());

          console.log(key, value);
        }
      },
    });
  }

  async stop() {
    await this.consumer.disconnect();
  }
}
