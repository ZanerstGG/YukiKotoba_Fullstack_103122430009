import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateKosakataDto } from './create-kosakata.dto.js';
import { UpdateKosakataDto } from './update-kosakata.dto.js';

const dataValid = {
  nihongo: 'ねこ',
  romaji: 'neko',
  arti: 'Kucing',
  category: 'Hewan',
};

// Mengembalikan nama field yang gagal validasi
async function fieldGagal(
  dto: typeof CreateKosakataDto | typeof UpdateKosakataDto,
  data: object,
): Promise<string[]> {
  const errors = await validate(plainToInstance(dto, data));
  return errors.map((error) => error.property);
}

describe('CreateKosakataDto', () => {
  it('lolos untuk data yang valid', async () => {
    expect(await fieldGagal(CreateKosakataDto, dataValid)).toEqual([]);
  });

  it('menolak nihongo kosong (@IsNotEmpty)', async () => {
    const hasil = await fieldGagal(CreateKosakataDto, {
      ...dataValid,
      nihongo: '',
    });
    expect(hasil).toContain('nihongo');
  });

  it('menolak arti yang bukan string (@IsString)', async () => {
    const hasil = await fieldGagal(CreateKosakataDto, {
      ...dataValid,
      arti: 123,
    });
    expect(hasil).toContain('arti');
  });

  it('menolak level di luar N5-N1 (@IsIn)', async () => {
    const hasil = await fieldGagal(CreateKosakataDto, {
      ...dataValid,
      level: 'N6',
    });
    expect(hasil).toContain('level');
  });

  it('menolak sudahHafal yang bukan boolean (@IsBoolean)', async () => {
    const hasil = await fieldGagal(CreateKosakataDto, {
      ...dataValid,
      sudahHafal: 'ya',
    });
    expect(hasil).toContain('sudahHafal');
  });
});

describe('UpdateKosakataDto', () => {
  it('semua field boleh dikosongkan (PartialType)', async () => {
    expect(await fieldGagal(UpdateKosakataDto, {})).toEqual([]);
  });

  it('tetap memvalidasi field yang dikirim', async () => {
    const hasil = await fieldGagal(UpdateKosakataDto, { level: 'N9' });
    expect(hasil).toContain('level');
  });
});