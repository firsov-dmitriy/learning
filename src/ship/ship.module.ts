import { Module } from '@nestjs/common';
import { ShipService } from './ship.service';
import { ShipController } from './ship.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ShipController],
  providers: [ShipService],
  imports: [PrismaModule],
})
export class ShipModule {}
