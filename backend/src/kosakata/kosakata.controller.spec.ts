import { Test, TestingModule } from '@nestjs/testing';
import { KosakataController } from './kosakata.controller.js';
import { KosakataService } from './kosakata.service.js';

describe('KosakataController', () => {
  let controller: KosakataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KosakataController],
      providers: [KosakataService],
    }).compile();

    controller = module.get<KosakataController>(KosakataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
