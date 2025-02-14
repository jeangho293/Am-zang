import { Inject, Injectable } from '@nestjs/common';
import type { Consumer, Kafka } from 'kafkajs';
import { ModuleRef } from '@nestjs/core';
import { handlers } from '../helpers/events';
import { setTxId } from '../helpers/trace-id';

@Injectable()
export class KafkaConsumerService {
  private readonly consumer: Consumer;

  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafka: Kafka,
    private readonly moduleRef: ModuleRef
  ) {
    this.consumer = this.kafka.consumer({ groupId: 'anole_api' });
  }

  async start() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'ddd_event', fromBeginning: false });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value && message.key) {
          const key = message.key.toString();
          const value = JSON.parse(message.value.toString());

          await Promise.all(
            handlers.map(async ([eventClass, serviceClass, serviceMethod]) => {
              if (key === eventClass.name) {
                // eslint-disable-next-line new-cap
                const domainEvent = Object.assign(new eventClass(), value);
                const serviceInstance = this.moduleRef.get(serviceClass, { strict: false });

                setTxId(domainEvent.txId);
                await serviceInstance[serviceMethod](domainEvent);
              }
            })
          );
        }
      },
    });
  }

  async stop() {
    await this.consumer.disconnect();
  }
}
