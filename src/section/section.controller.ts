import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@ApiTags('Section')
@Controller('ships/:shipId/sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  async create(@Param('shipId') shipId: string, @Body() dto: CreateSectionDto) {
    // Привяжем shipId к DTO
    return this.sectionService.create(+shipId, { ...dto });
  }

  @Get()
  async findAll(@Param('shipId') shipId: string) {
    return this.sectionService.findAll(+shipId);
  }

  @Get(':id')
  async findOne(@Param('shipId') shipId: string, @Param('id') id: string) {
    return this.sectionService.findOne(+id, +shipId);
  }

  @Patch(':id')
  async update(
    @Param('shipId') shipId: string,
    @Param('id') id: string,
    @Body() dto: UpdateSectionDto,
  ) {
    return this.sectionService.update(+id, dto, +shipId);
  }

  @Delete(':id')
  async remove(@Param('shipId') shipId: string, @Param('id') id: string) {
    return this.sectionService.remove(+id, +shipId);
  }
}
