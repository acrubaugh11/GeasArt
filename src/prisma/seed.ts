// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('AppaandMomo', 10);

  await prisma.admin.upsert({
    where: { username: 'admin' }, // ensures idempotency
    update: {}, // leave unchanged if already exists
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log('✅ Admin user seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
