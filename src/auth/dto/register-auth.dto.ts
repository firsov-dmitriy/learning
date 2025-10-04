import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  public firstName: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  public middleName: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  public lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}
