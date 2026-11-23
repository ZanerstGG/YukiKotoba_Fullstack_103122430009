export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export class Kosakata {
  id: string;
  nihongo: string;
  romaji: string;
  arti: string;
  category: string;
  tag: string | null;
  level: JlptLevel;
  sudahHafal: boolean;
  createdAt: string;
  updatedAt: string;
}