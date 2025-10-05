import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min, IsEnum } from 'class-validator';
import { IceClass } from '@prisma/client';

export class CalculateHullProfileDto {
  @ApiProperty({ example: IceClass.LU3, description: 'Класс льда судна' })
  @IsEnum(IceClass)
  iceClass: IceClass;

  @ApiProperty({ example: 120000, description: 'Ледовое усилие (кН)' })
  @IsNumber()
  @Min(0)
  iceForce: number;

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
