import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [SectionController],
  providers: [SectionService],
  imports: [PrismaModule],
})
export class SectionModule {}
