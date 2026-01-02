import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const warehouse = await prisma.warehouse.findUnique({ where: { id: 'main' } });
  const product = await prisma.product.findUnique({ where: { sku: 'SKU001' } });

  console.log('Warehouse:', warehouse);
  console.log('Product:', product);

  if (warehouse && product) {
    const inventory = await prisma.inventoryItem.findUnique({
      where: {
        productId_warehouseId: {
          productId: product.id,
          warehouseId: warehouse.id,
        },
      },
    });

    const stockMovements = await prisma.stockMovement.findMany({
      where: { productId: product.id, warehouseId: warehouse.id },
    });

    console.log('Inventory item:', inventory);
    console.log('StockMovements:', stockMovements);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());