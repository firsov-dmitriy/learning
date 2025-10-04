import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';

@Injectable()
export class LoadService {
  constructor(private prisma: PrismaService) {}

  async create(sectionId: number, createLoadDto: CreateLoadDto) {
    return this.prisma.load.create({
      data: { ...createLoadDto, sectionId },
    });
  }

  async findAll(sectionId?: number) {
    return this.prisma.load.findMany({
      where: sectionId ? { sectionId } : undefined,
      include: { section: true },
    });
  }

  async findOne(id: number) {
    const load = await this.prisma.load.findUnique({
      where: { id },
      include: { section: true },
    });
    if (!load) throw new NotFoundException(`Load with id ${id} not found`);
    return load;
  }

  async update(id: number, updateLoadDto: UpdateLoadDto) {
    const load = await this.prisma.load.findUnique({ where: { id } });
    if (!load) throw new NotFoundException(`Load with id ${id} not found`);
    return this.prisma.load.update({
      where: { id },
      data: updateLoadDto,
    });
  }

  async remove(id: number) {
    const load = await this.prisma.load.findUnique({ where: { id } });
    if (!load) throw new NotFoundException(`Load with id ${id} not found`);
    return this.prisma.load.delete({ where: { id } });
  }
}
