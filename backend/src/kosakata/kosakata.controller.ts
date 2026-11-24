import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateKosakataDto } from './dto/create-kosakata.dto.js';
import { UpdateKosakataDto } from './dto/update-kosakata.dto.js';
import { Kosakata } from './entities/kosakata.entity.js';
import { KosakataService } from './kosakata.service.js';

@Controller('kosakata')
export class KosakataController {
  constructor(private readonly kosakataService: KosakataService) {}

  @Post()
  create(@Body() createKosakataDto: CreateKosakataDto): Kosakata {
    return this.kosakataService.create(createKosakataDto);
  }

  @Get()
  findAll(): Kosakata[] {
    return this.kosakataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Kosakata {
    return this.kosakataService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateKosakataDto: UpdateKosakataDto,
  ): Kosakata {
    return this.kosakataService.update(id, updateKosakataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Kosakata {
    return this.kosakataService.remove(id);
  }
}