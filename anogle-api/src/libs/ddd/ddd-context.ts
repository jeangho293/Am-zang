import { Injectable } from '@nestjs/common';

@Injectable()
export class DddContext {
  txId: string;

  set(txId: string) {
    this.txId = txId;
  }
}
