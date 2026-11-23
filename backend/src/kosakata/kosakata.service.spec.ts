import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateKosakataDto } from './dto/create-kosakata.dto.js';
import { KosakataService } from './kosakata.service.js';

const contohKosakata: CreateKosakataDto = {
  nihongo: 'ねこ',
  romaji: 'neko',
  arti: 'Kucing',
  category: 'Hewan',
};

describe('KosakataService', () => {
  let service: KosakataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KosakataService],
    }).compile();

    service = module.get<KosakataService>(KosakataService);
  });

  it('create: menambah kosakata dengan nilai bawaan', () => {
    const hasil = service.create(contohKosakata);

    expect(hasil.id).toBeDefined();
    expect(hasil.level).toBe('N5');
    expect(hasil.sudahHafal).toBe(false);
    expect(hasil.tag).toBeNull();
    expect(service.findAll()).toHaveLength(1);
  });

  it('create: menolak tulisan Jepang yang sudah ada', () => {
    service.create(contohKosakata);

    expect(() => service.create(contohKosakata)).toThrow(ConflictException);
  });

  it('findOne: mengembalikan kosakata berdasarkan id', () => {
    const dibuat = service.create(contohKosakata);

    expect(service.findOne(dibuat.id).nihongo).toBe('ねこ');
  });

  it('findOne: melempar NotFoundException jika id tidak ada', () => {
    expect(() => service.findOne('id-tidak-ada')).toThrow(NotFoundException);
  });

  it('update: mengubah field yang dikirim saja', () => {
    const dibuat = service.create(contohKosakata);
    const hasil = service.update(dibuat.id, { sudahHafal: true });

    expect(hasil.sudahHafal).toBe(true);
    expect(hasil.arti).toBe('Kucing');
  });

  it('remove: menghapus kosakata dari daftar', () => {
    const dibuat = service.create(contohKosakata);
    service.remove(dibuat.id);

    expect(service.findAll()).toHaveLength(0);
    expect(() => service.findOne(dibuat.id)).toThrow(NotFoundException);
  });
});