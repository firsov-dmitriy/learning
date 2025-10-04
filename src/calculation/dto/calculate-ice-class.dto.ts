import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, Min } from 'class-validator';

export enum IceClass {
  LU1 = 'LU1',
  LU2 = 'LU2',
  LU3 = 'LU3',
  ARC4 = 'ARC4',
}

export class CalculateIceClassDto {
  @ApiProperty({ example: 0.8, description: 'Толщина льда (м)' })
  @IsNumber()
  @Min(0.01)
  iceThickness: number;

  @ApiProperty({ example: 5, description: 'Скорость судна (м/с)' })
  @IsNumber()
  @Min(0.1)
  shipSpeed: number;

  @ApiProperty({
    example: 12,
    description: 'Ширина носовой части или сечения (м)',
  })
  @IsNumber()
  @Min(0.1)
  beam: number;
}
