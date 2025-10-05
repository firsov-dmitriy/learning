import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IceClass } from '@prisma/client';
import { CalculateIceClassDto } from './dto/calculate-ice-class.dto';
import { CalculateHullProfileDto } from './dto/calculate-hull-profile.dto';

@Injectable()
export class CalculationService {
  constructor(private readonly prisma: PrismaService) {}

  async getHullProfileByShipId(shipId: number) {
    return this.prisma.hullCalculationResult.findFirst({
      where: { shipId },
      orderBy: { createdAt: 'desc' },
      include: {
        points: true,
      },
    });
  }

  calculateIceClass(params: CalculateIceClassDto) {
    const { iceThickness, shipSpeed, beam } = params;

    if (iceThickness <= 0 || shipSpeed <= 0 || beam <= 0) {
      throw new Error('Все параметры должны быть положительными');
    }

    const iceForce =
      Math.round(1200 * Math.pow(iceThickness, 1.5) * beam * shipSpeed * 100) /
      100;

    let selectedClass: string;
    if (iceForce <= 100000) {
      selectedClass = 'LU1';
    } else if (iceForce <= 150000) {
      selectedClass = 'LU2';
    } else if (iceForce <= 200000) {
      selectedClass = 'LU3';
    } else {
      selectedClass = 'ARC4';
    }

    return {
      iceClass: selectedClass as IceClass,
      iceForce,
    };
  }

  async calculateHullThicknessProfile(
    params: CalculateHullProfileDto,
    shipId: number,
  ) {
    const { iceClass, length, iceForce, steps = 10 } = params;

    if (length <= 0) throw new Error('Длина судна должна быть положительной');

    // Стандартные максимальные толщины для классов льда (в м)
    const maxHullByClass: Record<string, number> = {
      LU1: 0.02,
      LU2: 0.025,
      LU3: 0.03,
      ARC4: 0.035,
    };

    const minHullThickness = 0.015; // минимальная толщина в корме (м)
    const maxHullThickness =
      params.maxHullThickness ?? maxHullByClass[iceClass] ?? 0.03;

    const hullCalculation = await this.prisma.hullCalculationResult.create({
      data: {
        shipId,
        iceClass,
        iceForce,
        length,
      },
    });

    const pointsData: {
      hullCalculationResultId: number;
      position: number;
      thickness: number;
    }[] = [];

    for (let i = 0; i <= steps; i++) {
      const x = (length / steps) * i; // положение вдоль корпуса в м
      const thicknessM =
        maxHullThickness - ((maxHullThickness - minHullThickness) / length) * x;

      pointsData.push({
        hullCalculationResultId: hullCalculation.id,
        position: Math.round(x * 100) / 100,
        thickness: Math.round(thicknessM * 100 * 100) / 100,
      });
    }
    await this.prisma.hullProfilePoint.createMany({
      data: pointsData,
    });
    return { pointsData };
  }

  async getStressAndRecommendations(shipId: number) {
    const hullCalculation = await this.prisma.hullCalculationResult.findUnique({
      where: { shipId },
      include: { points: true },
    });

    if (!hullCalculation) {
      throw new Error('Профиль корпуса не найден для данного судна');
    }

    const { iceForce, points } = hullCalculation;

    // Получаем ширину корпуса из судна
    const ship = await this.prisma.ship.findUnique({
      where: { id: shipId },
    });
    if (!ship?.beam) throw new Error('Ширина судна не указана');

    const beam = ship.beam;

    const stressProfile = points.map((p) => {
      const h = p.thickness / 100; // м
      const y = h / 2;
      const I = (beam * Math.pow(h, 3)) / 12;
      const Q = (beam * Math.pow(h, 2)) / 8;

      const bendingStress = (iceForce * y) / I;
      const shearStress = (iceForce * Q) / (I * beam);

      return {
        position: p.position,
        thicknessCm: p.thickness,
        bendingStress: Math.round(bendingStress * 100) / 100,
        shearStress: Math.round(shearStress * 100) / 100,
      };
    });
    const allowableStress = 2.35e8; // Па для стали
    const recommendations = stressProfile.map((s) => {
      const bendingFactor = allowableStress / s.bendingStress;
      const shearFactor = allowableStress / s.shearStress;

      let recommendation = 'OK';
      if (bendingFactor < 1 || shearFactor < 1) {
        recommendation = 'Увеличить толщину корпуса';
      }

      return {
        position: s.position,
        thicknessCm: s.thicknessCm,
        bendingStress: s.bendingStress,
        shearStress: s.shearStress,
        recommendation,
      };
    });

    return {
      shipId,
      iceForce,
      profile: recommendations,
    };
  }

  async getFullHullAnalysis(shipId: number) {
    // 1️⃣ Получаем расчёт корпуса и профиль
    const hullCalculation = await this.prisma.hullCalculationResult.findUnique({
      where: { shipId },
      include: { points: true },
    });
    if (!hullCalculation)
      throw new NotFoundException('Профиль корпуса не найден');

    const { iceForce, points } = hullCalculation;

    // 2️⃣ Получаем ширину судна
    const ship = await this.prisma.ship.findUnique({ where: { id: shipId } });
    if (!ship?.beam) throw new NotFoundException('Ширина судна не указана');
    const beam = ship.beam;

    // 3️⃣ Параметры материала
    const allowableStress = 2.35e8; // Па, сталь
    const E = 2.1e11; // модуль упругости стали, Па
    const rhoSteel = 7850; // кг/м³

    const analysisProfile = points.map((p) => {
      const h = p.thickness / 100; // м
      const y = h / 2;
      const I = (beam * Math.pow(h, 3)) / 12;
      const Q = (beam * Math.pow(h, 2)) / 8;

      const bendingStress = (iceForce * y) / I;
      const shearStress = (iceForce * Q) / (I * beam);

      // Рекомендации
      const bendingFactor = allowableStress / bendingStress;
      const shearFactor = allowableStress / shearStress;
      let recommendation = 'OK';
      if (bendingFactor < 1 || shearFactor < 1)
        recommendation = 'Увеличить толщину корпуса';

      // Прогиб (макс. приближённо)
      const deltaMax =
        (5 * iceForce * Math.pow(ship.length || 1, 4)) / (384 * E * I);

      // Масса корпуса на единицу длины
      const massPerMeter = rhoSteel * beam * h; // кг/м

      // Максимальная безопасная скорость (v_max)
      const vMax = Math.pow(
        allowableStress / (1200 * Math.pow(h, 1.5) * beam),
        1,
      ); // м/с, упрощённо

      return {
        position: Math.round(p.position * 100) / 100,
        thickness: p.thickness,
        bendingStress: Math.round(bendingStress * 100) / 100,
        shearStress: Math.round(shearStress * 100) / 100,
        recommendation,
        deltaMax: Math.round(deltaMax * 1000) / 1000, // в м
        massPerMeter: Math.round(massPerMeter),
        vMax: Math.round(vMax * 100) / 100,
      };
    });

    return {
      shipId,
      iceForce,
      profile: analysisProfile,
    };
  }
}
