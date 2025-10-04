import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CalculateIceClassDto } from './dto/calculate-ice-class.dto';
import { CalculateHullProfileDto } from './dto/calculate-hull-profile.dto';

@ApiTags('Calculation')
@Controller('calculations')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  @Post('ice-class')
  @ApiOperation({ summary: 'Расчёт ледового усилия по классу льда' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает рассчитанное ледовое усилие (кН)',
  })
  calculateIceForce(@Body() dto: CalculateIceClassDto) {
    return this.calculationService.calculateIceClass(dto);
  }
  @Post('hull-profile')
  @ApiOperation({
    summary: 'Расчёт профиля толщины корпуса судна по ледовому усилию',
  })
  @ApiResponse({
    status: 201,
    description:
      'Возвращает профиль корпуса с толщинами в см вдоль длины судна',
  })
  calculateHullThicknessProfile(@Body() dto: CalculateHullProfileDto) {
    return this.calculationService.calculateHullThicknessProfile(dto);
  }
}
