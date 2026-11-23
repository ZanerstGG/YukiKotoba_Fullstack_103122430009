import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KosakataService } from './kosakata.service.js';
import { CreateKosakataDto } from './dto/create-kosakata.dto.js';
import { UpdateKosakataDto } from './dto/update-kosakata.dto.js';

@Controller('kosakata')
export class KosakataController {
  constructor(private readonly kosakataService: KosakataService) {}

  @Post()
  create(@Body() createKosakataDto: CreateKosakataDto) {
    return this.kosakataService.create(createKosakataDto);
  }

  @Get()
  findAll() {
    return this.kosakataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kosakataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKosakataDto: UpdateKosakataDto) {
    return this.kosakataService.update(+id, updateKosakataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kosakataService.remove(+id);
  }
}
