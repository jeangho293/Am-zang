import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, Partitioners, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private producer: Producer;

  private consumer: Consumer;

  async onModuleInit() {
    await Promise.all([this.producer.connect(), this.consumer.connect()]);
  }

  constructor(@Inject('KAFKA_CLIENT') private kafka: Kafka) {
    this.producer = this.kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
    this.consumer = this.kafka.consumer({ groupId: 'my-app' });
  }

  async produce(topic: string, message: any) {
    await this.producer.send({ topic, messages: [{ value: 'this is value' }] });
  }

  async consume() {
    await this.consumer.subscribe({ topic: 'test' });

    await this.consumer.run({
      eachMessage: async ({ message, topic }) => {
        if (message.value) {
          console.log(message.value.toString());
        }
      },
    });
  }
}
