import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ShipService } from './ship.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ship')
@Controller('ship')
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @Post()
  create(@Body() createShipDto: CreateShipDto, @Req() req) {
    return this.shipService.create(createShipDto, req);
  }

  @Get()
  findAll(@Req() req) {
    return this.shipService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipDto: UpdateShipDto) {
    return this.shipService.update(+id, updateShipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipService.remove(+id);
  }
}
