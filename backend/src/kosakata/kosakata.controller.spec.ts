import { Test, TestingModule } from '@nestjs/testing';
import { KosakataController } from './kosakata.controller.js';
import { KosakataService } from './kosakata.service.js';

describe('KosakataController', () => {
  let controller: KosakataController;

  const serviceTiruan = {
    create: vi.fn(),
    findAll: vi.fn().mockReturnValue([]),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [KosakataController],
      providers: [{ provide: KosakataService, useValue: serviceTiruan }],
    }).compile();

    controller = module.get<KosakataController>(KosakataController);
  });

  it('findAll: meneruskan request ke service', () => {
    expect(controller.findAll()).toEqual([]);
    expect(serviceTiruan.findAll).toHaveBeenCalledTimes(1);
  });

  it('update: meneruskan id dan data ke service', () => {
    controller.update('id-1', { sudahHafal: true });

    expect(serviceTiruan.update).toHaveBeenCalledWith('id-1', {
      sudahHafal: true,
    });
  });

  it('remove: meneruskan id ke service', () => {
    controller.remove('id-1');

    expect(serviceTiruan.remove).toHaveBeenCalledWith('id-1');
  });
});