import { Injectable, Req } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';

import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../types/JwtPayload';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShipService {
  constructor(private prisma: PrismaService) {}
  async create(createShipDto: CreateShipDto, @Req() req: { user: JwtPayload }) {
    const user = await this.prisma.user.findUnique({
      where: { email: req.user.email },
    });

    if (!user) throw new Error('User not found');

    const shipType = await this.prisma.shipType.findUnique({
      where: { code: createShipDto.type },
    });

    if (!shipType) throw new Error('Ship type not found');
    return this.prisma.ship.create({
      data: {
        name: createShipDto.name,
        description: createShipDto.description,
        type: { connect: { code: createShipDto.type } },
        user: { connect: { email: req.user.email } },
      },
    });
  }

  findAll(@Req() req: { user: JwtPayload }) {
    return this.prisma.user.findUnique({
      where: { email: req.user.email },
      select: {
        email: true,
        firstName: true,
        middleName: true,
        lastName: true,
        ships: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.ship.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            middleName: true,
            lastName: true,
          },
        },
        type: true,
      },
    });
  }
  async update(id: number, updateShipDto: UpdateShipDto) {
    const data: Prisma.ShipUpdateInput = {
      name: updateShipDto.name,
      description: updateShipDto.description,
    };

    return this.prisma.ship.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            middleName: true,
            lastName: true,
          },
        },
        type: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.ship.delete({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            middleName: true,
            lastName: true,
          },
        },
        type: true,
      },
    });
  }
}
