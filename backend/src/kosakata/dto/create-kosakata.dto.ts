import type { JlptLevel } from '../entities/kosakata.entity.js';

export class CreateKosakataDto {
  nihongo: string;
  romaji: string;
  arti: string;
  category: string;
  tag?: string | null;
  level?: JlptLevel;
  sudahHafal?: boolean;
}