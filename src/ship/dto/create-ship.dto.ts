import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ShipTypeEnum } from '../../ship-type/ship-type.enum';
import { IceTypeEnum } from '../../types/IceTypeEnum';

export class CreateShipDto {
  @ApiProperty({ description: 'Название судна' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Описание судна' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Тип судна', enum: ShipTypeEnum })
  @IsEnum(ShipTypeEnum)
  type: ShipTypeEnum;

  @ApiProperty({ description: 'ID пользователя, создавшего судно' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Длина судна, м', required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  length?: number = 0;

  @ApiProperty({ description: 'Ширина судна, м', required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  beam?: number = 0;

  @ApiProperty({ description: 'Осадка судна, м', required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  draft?: number = 0;

  @ApiProperty({
    description: 'Толщина корпуса, м',
    required: false,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  hullThickness?: number = 0;

  @ApiProperty({
    description: 'Мощность двигателя, кВт',
    required: false,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  enginePower?: number = 0;

  @ApiProperty({
    description: 'Наличие ледокольного носа',
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  iceBreakerBow?: boolean = false;

  @ApiProperty({
    description: 'Толщина льда, для ледоколов, м',
    required: false,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  iceThickness?: number = 0;

  @ApiProperty({
    description: 'Класс льда, например Arc4',
    required: false,
    enum: IceTypeEnum,
  })
  @IsEnum(IceTypeEnum)
  iceClass?: IceTypeEnum;

  @IsOptional()
  @ApiProperty({
    description: 'Материал корпуса',
    required: false,
    default: 'steel',
  })
  @IsString()
  @IsOptional()
  material?: string = 'steel';
}
