import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LoadService } from './load.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Load')
@Controller('sections/:sectionId/loads')
export class LoadController {
  constructor(private readonly loadsService: LoadService) {}

  @Post()
  create(@Param('sectionId') sectionId: string, @Body() dto: CreateLoadDto) {
    return this.loadsService.create(+sectionId);
  }

  @Get()
  findAll(@Param('sectionId') sectionId: string) {
    return this.loadsService.findAll();
  }
}
