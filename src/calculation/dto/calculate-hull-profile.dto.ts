import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min, IsString } from 'class-validator';

export class CalculateHullProfileDto {
  @ApiProperty({ example: 'LU3', description: 'Класс льда судна' })
  @IsString()
  iceClass: string;

  @ApiProperty({ example: 120, description: 'Длина судна в метрах' })
  @IsNumber()
  @Min(1)
  length: number;

  @ApiPropertyOptional({
    example: 0.03,
    description: 'Максимальная толщина корпуса в м (по умолчанию для iceClass)',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxHullThickness?: number;

  @ApiPropertyOptional({
    example: 0.015,
    description: 'Минимальная толщина корпуса в м',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minHullThickness?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Количество точек вдоль корпуса для расчёта профиля',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  steps?: number;
}
