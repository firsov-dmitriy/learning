import { IsInt, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateSectionDto {
  @IsInt()
  shipId: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  area?: number;

  @IsOptional()
  @IsNumber()
  momentInertia?: number;

  @IsOptional()
  @IsNumber()
  length?: number;

  @IsOptional()
  @IsNumber()
  beam?: number;
}
