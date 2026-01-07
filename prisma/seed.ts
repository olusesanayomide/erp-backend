import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed a customer
  const customer = await prisma.customer.find({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  });

  console.log('Customer seeding completed.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
