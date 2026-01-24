import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = 'AdminPassword123!';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  console.log('Seeding database...');

  await prisma.user.upsert({
    where: { email: 'admin@erp.com' },
    update: {},
    create: {
      email: 'admin@erp.com',
      password: hashedPassword,
      name: 'System Admin',
      roles: {
        // This is a Many-to-Many "connectOrCreate"
        connectOrCreate: [
          {
            where: { name: UserRole.ADMIN },
            create: { name: UserRole.ADMIN },
          },
        ],
      },
    },
  });

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
