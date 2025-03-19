import { TestingModule, Test } from '@nestjs/testing';
import { PingController } from './ping.controller';

describe('Ping Controller', () => {
  let pingController: PingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PingController],
    }).compile();

    pingController = app.get(PingController);
  });

  describe('ping test', () => {
    it('should return "pong"', () => {
      expect(pingController.get()).toBe('pong');
    });
  });
});
