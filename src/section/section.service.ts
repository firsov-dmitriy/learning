// section.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Предполагается, что PrismaService уже есть
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionService {
  constructor(private prisma: PrismaService) {}

  async create(shipId: number, createSectionDto: CreateSectionDto) {
    return this.prisma.section.create({
      data: { ...createSectionDto, shipId },
    });
  }

  async findAll(shipId: number) {
    return this.prisma.section.findMany({
      where: { shipId },
      include: { ship: true, loads: true, results: true },
    });
  }
  async findOne(id: number, shipId: number) {
    const section = await this.prisma.section.findFirst({
      where: { id, shipId },
      include: { ship: true, loads: true, results: true },
    });
    if (!section)
      throw new NotFoundException(`Section with id ${id} not found`);
    return section;
  }

  async update(id: number, dto: UpdateSectionDto, shipId: number) {
    const section = await this.prisma.section.findFirst({
      where: { id, shipId },
    });
    if (!section)
      throw new NotFoundException(`Section with id ${id} not found`);
    return this.prisma.section.update({ where: { id }, data: dto });
  }
  async remove(id: number, shipId: number) {
    const section = await this.prisma.section.findFirst({
      where: { id, shipId },
    });
    if (!section)
      throw new NotFoundException(`Section with id ${id} not found`);
    return this.prisma.section.delete({ where: { id } });
  }
}
