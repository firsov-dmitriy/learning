import { Controller, Get, Post, Param } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Calculation')
@Controller('calculations')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  @Post('ship/:shipId')
  calculateShip(@Param('shipId') shipId: string) {
    return this.calculationService.calculateShip(+shipId);
  }

  @Post('section/:sectionId')
  calculateSection(@Param('sectionId') sectionId: string) {
    return this.calculationService.calculateSection(+sectionId);
  }

  @Get('ship/:shipId')
  getShipResults(@Param('shipId') shipId: string) {
    return this.calculationService.getShipResults(+shipId);
  }

  @Get('section/:sectionId')
  getSectionResults(@Param('sectionId') sectionId: string) {
    return this.calculationService.getSectionResults(+sectionId);
  }
}
