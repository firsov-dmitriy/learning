import { PartialType } from '@nestjs/mapped-types';
import { CreateSectionDto } from './create-calculation.dto';

export class UpdateSectionDto extends PartialType(CreateSectionDto) {}
