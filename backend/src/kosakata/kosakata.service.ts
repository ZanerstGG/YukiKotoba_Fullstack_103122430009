import { Injectable } from '@nestjs/common';
import { CreateKosakataDto } from './dto/create-kosakata.dto.js';
import { UpdateKosakataDto } from './dto/update-kosakata.dto.js';

@Injectable()
export class KosakataService {
  create(createKosakataDto: CreateKosakataDto) {
    return 'This action adds a new kosakata';
  }

  findAll() {
    return `This action returns all kosakata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kosakata`;
  }

  update(id: number, updateKosakataDto: UpdateKosakataDto) {
    return `This action updates a #${id} kosakata`;
  }

  remove(id: number) {
    return `This action removes a #${id} kosakata`;
  }
}
