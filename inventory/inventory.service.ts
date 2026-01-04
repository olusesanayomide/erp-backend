import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { StockMovementType } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  // Get all inventory items
  async getInventory() {
    return this.prisma.inventoryItem.findMany({
      include: {
        product: true,
        warehouse: true,
      },
    });
  }

  // Add stock to a warehouse
  async stockIn(productId: string, warehouseId: string, quantity: number) {
    if (quantity <= 0)
      throw new BadRequestException('Quantity must be greater than 0');

    return this.prisma.$transaction([
      // Record the stock movement
      this.prisma.stockMovement.create({
        data: {
          productId,
          warehouseId,
          quantity,
          type: StockMovementType.IN,
          reference: 'API_STOCK_IN',
        },
      }),

      // Update or create the inventory item
      this.prisma.inventoryItem.upsert({
        where: {
          productId_warehouseId: { productId, warehouseId },
        },
        update: {
          quantity: { increment: quantity },
        },
        create: {
          productId,
          warehouseId,
          quantity,
        },
      }),
    ]);
  }

  // Remove stock from a warehouse
  async stockOut(productId: string, warehouseId: string, quantity: number) {
    if (quantity <= 0)
      throw new BadRequestException('Quantity must be greater than 0');

    // Check if inventory exists and has enough stock
    const inventory = await this.prisma.inventoryItem.findUnique({
      where: { productId_warehouseId: { productId, warehouseId } },
    });

    if (!inventory)
      throw new BadRequestException('Inventory item does not exist');
    if (inventory.quantity < quantity)
      throw new BadRequestException('Insufficient stock');

    return this.prisma.$transaction([
      this.prisma.stockMovement.create({
        data: {
          productId,
          warehouseId,
          quantity,
          type: StockMovementType.OUT,
          reference: 'API_STOCK_OUT',
        },
      }),
      this.prisma.inventoryItem.update({
        where: { productId_warehouseId: { productId, warehouseId } },
        data: { quantity: { decrement: quantity } },
      }),
    ]);
  }
}
