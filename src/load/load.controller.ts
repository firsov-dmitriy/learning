import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoadService } from './load.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';

@ApiTags('Load')
@Controller('sections/:sectionId/loads')
export class LoadController {
  constructor(private readonly loadService: LoadService) {}

  @Post()
  async create(
    @Param('sectionId') sectionId: string,
    @Body() dto: CreateLoadDto,
  ) {
    return this.loadService.create(+sectionId, { ...dto });
  }

  @Get()
  async findAll(@Param('sectionId') sectionId: string) {
    return this.loadService.findAll(+sectionId);
  }

  @Get(':id')
  async findOne(
    @Param('sectionId') sectionId: string,
    @Param('id') id: string,
  ) {
    return this.loadService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('sectionId') sectionId: string,
    @Param('id') id: string,
    @Body() dto: UpdateLoadDto,
  ) {
    return this.loadService.update(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('sectionId') sectionId: string, @Param('id') id: string) {
    return this.loadService.remove(+id);
  }
}
