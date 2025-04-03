import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';

@Injectable()
export class GymsService extends DddService {
  constructor() {
    super();
  }

  async list() {}
}
