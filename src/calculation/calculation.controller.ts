import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CalculateIceClassDto } from './dto/calculate-ice-class.dto';
import { CalculateHullProfileDto } from './dto/calculate-hull-profile.dto';

@ApiTags('Calculation')
@Controller('calculations')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  @Post('ice-class/:shipId')
  @ApiOperation({ summary: 'Расчёт ледового усилия по классу льда' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает рассчитанное ледовое усилие (кН)',
  })
  calculateIceForce(
    @Param('shipId') shipId: string,
    @Body() dto: CalculateIceClassDto,
  ) {
    return this.calculationService.calculateIceClass(dto);
  }
  @Post('hull-profile/:shipId')
  @ApiOperation({
    summary: 'Расчёт профиля толщины корпуса судна по ледовому усилию',
  })
  @ApiResponse({
    status: 201,
    description:
      'Возвращает профиль корпуса с толщинами в см вдоль длины судна',
  })
  calculateHullThicknessProfile(
    @Param('shipId') shipId: string,
    @Body() dto: CalculateHullProfileDto,
  ) {
    return this.calculationService.calculateHullThicknessProfile(dto, +shipId);
  }

  @Get('hull-profile/:shipId')
  @ApiOperation({ summary: 'Получить все расчёты профиля корпуса для судна' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает массив расчётов профиля корпуса с точками',
  })
  getHullProfile(@Param('shipId') shipId: number) {
    return this.calculationService.getHullProfileByShipId(shipId);
  }
  @Get('stress/:shipId')
  @ApiOperation({
    summary: 'Расчёт напряжений и рекомендаций по профилю корпуса',
  })
  @ApiResponse({
    status: 200,
    description: 'Возвращает массив точек с bending, shear и рекомендациями',
  })
  async getStress(@Param('shipId') shipId: number) {
    return this.calculationService.getStressAndRecommendations(shipId);
  }

  @Get('full-analysis/:shipId')
  @ApiOperation({ summary: 'Полный анализ корпуса судна по iceForce' })
  @ApiResponse({
    status: 200,
    description:
      'Возвращает профиль с напряжениями, прогибом, массой и рекомендациями',
  })
  async getFullAnalysis(@Param('shipId') shipId: number) {
    return this.calculationService.getFullHullAnalysis(Number(shipId));
  }
}
