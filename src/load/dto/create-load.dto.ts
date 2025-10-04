import { IsNumber, IsOptional, IsEnum } from 'class-validator';

export enum LoadType {
  BENDING = 'BENDING',
  SHEAR = 'SHEAR',
  AXIAL = 'AXIAL',
}

export class CreateLoadDto {
  @IsEnum(LoadType)
  type: LoadType; // Тип нагрузки: BENDING, SHEAR, AXIAL

  @IsNumber()
  value: number; // Величина нагрузки

  @IsOptional()
  @IsNumber()
  position?: number; // Расстояние от начала сечения
}
