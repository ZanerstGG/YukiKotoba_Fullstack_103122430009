import { randomUUID } from 'node:crypto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKosakataDto } from './dto/create-kosakata.dto.js';
import { UpdateKosakataDto } from './dto/update-kosakata.dto.js';
import { Kosakata } from './entities/kosakata.entity.js';

@Injectable()
export class KosakataService {
  // Penyimpanan sementara di memori: data hilang saat server restart
  private kosakata: Kosakata[] = [];

  create(createKosakataDto: CreateKosakataDto): Kosakata {
    this.pastikanBelumAda(createKosakataDto.nihongo);

    const sekarang = new Date().toISOString();
    const kosakataBaru: Kosakata = {
      id: randomUUID(),
      nihongo: createKosakataDto.nihongo,
      romaji: createKosakataDto.romaji,
      arti: createKosakataDto.arti,
      category: createKosakataDto.category,
      tag: createKosakataDto.tag ?? null,
      level: createKosakataDto.level ?? 'N5',
      sudahHafal: createKosakataDto.sudahHafal ?? false,
      createdAt: sekarang,
      updatedAt: sekarang,
    };

    this.kosakata.push(kosakataBaru);
    return kosakataBaru;
  }

  findAll(): Kosakata[] {
    // Kosakata terbaru tampil paling atas
    return [...this.kosakata].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
  }

  findOne(id: string): Kosakata {
    const kosakata = this.kosakata.find((item) => item.id === id);
    if (!kosakata) {
      throw new NotFoundException(`Kosakata dengan id ${id} tidak ditemukan`);
    }
    return kosakata;
  }

  update(id: string, updateKosakataDto: UpdateKosakataDto): Kosakata {
    const kosakata = this.findOne(id);

    const nihongoBerubah =
      updateKosakataDto.nihongo !== undefined &&
      updateKosakataDto.nihongo !== kosakata.nihongo;
    if (nihongoBerubah) {
      this.pastikanBelumAda(updateKosakataDto.nihongo!);
    }

    Object.assign(kosakata, updateKosakataDto, {
      updatedAt: new Date().toISOString(),
    });
    return kosakata;
  }

  remove(id: string): Kosakata {
    const kosakata = this.findOne(id);
    this.kosakata = this.kosakata.filter((item) => item.id !== id);
    return kosakata;
  }

  private pastikanBelumAda(nihongo: string): void {
    const sudahAda = this.kosakata.some((item) => item.nihongo === nihongo);
    if (sudahAda) {
      throw new ConflictException(`Kosakata "${nihongo}" sudah ada`);
    }
  }
}