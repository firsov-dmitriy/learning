import { Module } from '@nestjs/common';
import { LoadService } from './load.service';
import { LoadController } from './load.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [LoadController],
  providers: [LoadService],
  imports: [PrismaModule],
})
export class LoadModule {}
