import { PrismaClient } from '@prisma/client';
import 'dotenv/config'; // make sure DATABASE_URL is loaded
console.log(process.env.DATABASE_URL);

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

async function main() {
  // Ensure warehouse exists (id set to 'main' for reproducible seeding)
  const warehouse = await prisma.warehouse.upsert({
    where: { id: 'main' },
    update: {},
    create: { id: 'main', name: 'Main Warehouse' },
  });

  // Ensure product exists (sku is unique so we upsert by sku)
  const product = await prisma.product.upsert({
    where: { sku: 'SKU001' },
    update: {},
    create: { sku: 'SKU001', name: 'Sample Product', price: 0.0 },
  });

  if (warehouse && product) {
    try {
      await prisma.$transaction([
        prisma.stockMovement.create({
          data: {
            productId: product.id,
            warehouseId: warehouse.id,
            quantity: 50, // initial stock
            type: 'IN',
            reference: 'INITIAL_SEED',
          },
        }),
        prisma.inventoryItem.upsert({
          where: {
            productId_warehouseId: {
              productId: product.id,
              warehouseId: warehouse.id,
            },
          },
          update: { quantity: { increment: 50 } },
          create: {
            productId: product.id,
            warehouseId: warehouse.id,
            quantity: 50,
          },
        }),
      ]);
      console.log('Seeding executed for warehouse and product.');
    } catch (err) {
      console.error('Error during seeding:', err);
      throw err;
    }
  } else {
    console.log('Skipping seeding: warehouse or product not found. Run migrations or create initial records before seeding.');
  }

  console.log('Seeding completed.');
}

main()
  .catch((e: any) => console.error(e))
  .finally(async () => await prisma.$disconnect());
