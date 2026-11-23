import { Test, TestingModule } from '@nestjs/testing';
import { KosakataService } from './kosakata.service.js';

describe('KosakataService', () => {
  let service: KosakataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KosakataService],
    }).compile();

    service = module.get<KosakataService>(KosakataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
