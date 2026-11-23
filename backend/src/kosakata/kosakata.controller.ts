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

@Controller('kosakata') // prefix rute: /kosakata
export class KosakataController {
  // Dependency Injection: Nest yang membuat dan menyediakan KosakataService
  constructor(private readonly kosakataService: KosakataService) {}

  @Post() // POST /kosakata
  create(@Body() createKosakataDto: CreateKosakataDto): Kosakata {
    return this.kosakataService.create(createKosakataDto);
  }

  @Get() // GET /kosakata
  findAll(): Kosakata[] {
    return this.kosakataService.findAll();
  }

  @Get(':id') // GET /kosakata/:id
  findOne(@Param('id', ParseUUIDPipe) id: string): Kosakata {
    return this.kosakataService.findOne(id);
  }

  @Patch(':id') // PATCH /kosakata/:id
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateKosakataDto: UpdateKosakataDto,
  ): Kosakata {
    return this.kosakataService.update(id, updateKosakataDto);
  }

  @Delete(':id') // DELETE /kosakata/:id
  remove(@Param('id', ParseUUIDPipe) id: string): Kosakata {
    return this.kosakataService.remove(id);
  }
}