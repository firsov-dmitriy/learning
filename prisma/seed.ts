import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const shipTypes = [
    { name: 'Сухогруз', code: 'dry_cargo' },
    { name: 'Танкер', code: 'tanker' },
    { name: 'Газовоз', code: 'lng_carrier' },
    { name: 'Ро-ро судно', code: 'ro_ro' },
    { name: 'Пассажирский лайнер', code: 'passenger' },
    { name: 'Ледокол', code: 'icebreaker' },
    { name: 'Тяжеловоз', code: 'heavy_lift' },
  ];

  for (const type of shipTypes) {
    await prisma.shipType.upsert({
      where: { code: type.code },
      update: {},
      create: type,
    });
  }

  console.log('Ship types seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
