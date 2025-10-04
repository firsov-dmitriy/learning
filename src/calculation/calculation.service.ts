import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IceClass } from '@prisma/client';
import { CalculateIceClassDto } from './dto/calculate-ice-class.dto';
import { CalculateHullProfileDto } from './dto/calculate-hull-profile.dto';

@Injectable()
export class CalculationService {
  constructor(private readonly prisma: PrismaService) {}

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

  calculateHullThicknessProfile(params: CalculateHullProfileDto) {
    const { iceClass, length, steps = 10 } = params;

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

    const profile: { position: number; thickness: number }[] = [];

    for (let i = 0; i <= steps; i++) {
      const x = (length / steps) * i; // положение вдоль корпуса в м
      // Линейная интерполяция от носа к корме
      const thicknessM =
        maxHullThickness - ((maxHullThickness - minHullThickness) / length) * x;

      profile.push({
        position: Math.round(x * 100) / 100, // позиция в м с 2 знаками
        thickness: Math.round(thicknessM * 100 * 100) / 100, // переводим в см и округляем до 2 знаков
      });
    }

    return { profile };
  }
}
