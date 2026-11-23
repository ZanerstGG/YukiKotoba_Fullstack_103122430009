import { PartialType } from '@nestjs/mapped-types';
import { CreateKosakataDto } from './create-kosakata.dto.js';

export class UpdateKosakataDto extends PartialType(CreateKosakataDto) {}
