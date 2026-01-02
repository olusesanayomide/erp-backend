// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import 'dotenv/config'; // make sure DATABASE_URL is loaded

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});
async function main() {
  // Warehouse
  await prisma.warehouse.upsert({
    where: { id: 'main' },
    update: {},
    create: { name: 'Main Warehouse' },
  });

  // Product
  await prisma.product.upsert({
    where: { sku: 'SKU001' },
    update: {},
    create: { name: 'Sample Product', sku: 'SKU001', price: 100 },
  });

  console.log('Seed completed');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
