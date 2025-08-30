import { Module } from '@nestjs/common';
import { ShipTypeService } from './ship-type.service';
import { ShipTypeController } from './ship-type.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ShipTypeController],
  providers: [ShipTypeService],
  imports: [PrismaModule],
})
export class ShipTypeModule {}
