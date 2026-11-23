import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { JLPT_LEVELS, type JlptLevel } from '../entities/kosakata.entity.js';

export class CreateKosakataDto {
  @IsString()
  @IsNotEmpty({ message: 'Tulisan Jepang (nihongo) wajib diisi' })
  @MaxLength(50)
  nihongo: string;

  @IsString()
  @IsNotEmpty({ message: 'Romaji wajib diisi' })
  @MaxLength(100)
  romaji: string;

  @IsString()
  @IsNotEmpty({ message: 'Arti wajib diisi' })
  @MaxLength(100)
  arti: string;

  @IsString()
  @IsNotEmpty({ message: 'Kategori wajib diisi' })
  @MaxLength(60)
  category: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  tag?: string | null;

  @IsOptional()
  @IsIn(JLPT_LEVELS, {
    message: `level harus salah satu dari: ${JLPT_LEVELS.join(', ')}`,
  })
  level?: JlptLevel;

  @IsOptional()
  @IsBoolean({ message: 'sudahHafal harus bernilai true atau false' })
  sudahHafal?: boolean;
}