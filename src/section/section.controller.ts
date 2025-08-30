import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Section')
@Controller('ships/:shipId/sections')
export class SectionController {
  constructor(private readonly sectionsService: SectionService) {}

  @Post()
  create(@Param('shipId') shipId: string, @Body() dto: CreateSectionDto) {
    return this.sectionsService.create(+shipId);
  }

  @Get()
  findAll(@Param('shipId') shipId: string) {
    return this.sectionsService.findAll();
  }
}
