import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ShipTypeService } from './ship-type.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../public/decorator';
import { ShipTypeEnum } from './ship-type.enum';

@ApiTags('Ship-Type')
@Controller('ship-type')
export class ShipTypeController {
  constructor(private readonly shipTypeService: ShipTypeService) {}
  @Get()
  @Public()
  getShipType() {
    return this.shipTypeService.findAll();
  }
  @Public()
  @Get('code/:code')
  findOneByCode(
    @Param('code', new ParseEnumPipe(ShipTypeEnum)) code: ShipTypeEnum,
  ) {
    console.log(code);
    return this.shipTypeService.findOneByCode(code);
  }
  @Public()
  @Get('id/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.shipTypeService.findOneById(id);
  }
}
