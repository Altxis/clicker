import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create initial counter
  const counter = await prisma.counter.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      value: 0,
    },
  });

  console.log('✅ Seeded counter:', counter);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
