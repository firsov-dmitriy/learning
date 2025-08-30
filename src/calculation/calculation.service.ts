import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Section, Load, CalculationResult } from '@prisma/client';

@Injectable()
export class CalculationService {
  constructor(private readonly prisma: PrismaService) {}

  // Рассчитать одну секцию
  async calculateSection(sectionId: number): Promise<CalculationResult> {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { loads: true },
    });

    if (!section) throw new NotFoundException('Section not found');

    const bendingMoment = this.calculateBendingMoment(section.loads, section);
    const shearForce = this.calculateShearForce(section.loads);
    const bendingStress = this.calculateBendingStress(bendingMoment, section);
    const shearStress = this.calculateShearStress(shearForce, section);
    const deflection = this.calculateDeflection(section, bendingMoment);

    return this.prisma.calculationResult.create({
      data: {
        sectionId: section.id,
        bendingStress,
        shearStress,
        deflection,
      },
    });
  }

  // Рассчитать все секции судна
  async calculateShip(shipId: number): Promise<CalculationResult[]> {
    const sections = await this.prisma.section.findMany({
      where: { shipId },
      include: { loads: true },
    });

    const results: CalculationResult[] = [];
    for (const section of sections) {
      const result = await this.calculateSection(section.id);
      results.push(result);
    }
    return results;
  }

  // Получить последние результаты расчета секции
  async getSectionResults(sectionId: number): Promise<CalculationResult[]> {
    return this.prisma.calculationResult.findMany({
      where: { sectionId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Получить последние результаты расчета судна
  async getShipResults(shipId: number): Promise<CalculationResult[]> {
    const sections = await this.prisma.section.findMany({ where: { shipId } });
    const sectionIds = sections.map((s) => s.id);
    return this.prisma.calculationResult.findMany({
      where: { sectionId: { in: sectionIds } },
      orderBy: { createdAt: 'desc' },
    });
  }

  private calculateBendingMoment(loads: Load[], section: Section): number {
    return loads
      .filter((l) => l.type === 'BENDING')
      .reduce((sum, l) => sum + l.value, 0);
  }

  private calculateShearForce(loads: Load[]): number {
    return loads
      .filter((l) => l.type === 'SHEAR')
      .reduce((sum, l) => sum + l.value, 0);
  }

  private calculateBendingStress(moment: number, section: Section): number {
    const y = section.beam ? section.beam / 2 : 0.5;
    const I = section.momentInertia || 1;
    return (moment * y) / I;
  }

  private calculateShearStress(shearForce: number, section: Section): number {
    const Q = section.area ? section.area / 2 : 1;
    const I = section.momentInertia || 1;
    const b = section.beam || 1;
    return (shearForce * Q) / (I * b);
  }

  private calculateDeflection(section: Section, bendingMoment: number): number {
    const L = section.length || 1;
    const E = 2.1e11; // модуль упругости стали, Па
    const I = section.momentInertia || 1;
    return (5 * bendingMoment * Math.pow(L, 4)) / (384 * E * I);
  }
}
