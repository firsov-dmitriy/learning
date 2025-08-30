import { Module } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { CalculationController } from './calculation.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CalculationController],
  providers: [CalculationService],
  imports: [PrismaModule],
})
export class CalculationModule {}
