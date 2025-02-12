import { Inject, Injectable } from '@nestjs/common';
import { Partitioners, type Kafka, type Producer } from 'kafkajs';
import type { DddEvent } from '../ddd';

@Injectable()
export class KafkaProducerService {
  private readonly producer: Producer;

  constructor(@Inject('KAFKA_CLIENT') private readonly kafka: Kafka) {
    this.producer = this.kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
  }

  async send(events: DddEvent[]) {
    await this.producer.connect();
    await this.producer.send({
      topic: 'ddd_event',
      messages: events.flatMap(({ type, data }) => ({ key: type, value: data })),
    });
  }

  async stop() {
    await this.producer.disconnect();
  }
}
