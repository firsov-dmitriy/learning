import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShipTypeService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.shipType.findMany();
  }

  findOneByCode(code: string) {
    return this.prisma.shipType.findUnique({
      where: { code },
    });
  }

  findOneById(id: number) {
    return this.prisma.shipType.findUnique({
      where: { id },
    });
  }
}
