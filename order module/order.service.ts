import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InventoryService } from 'inventory module/inventory.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private inventoryService: InventoryService, // inject inventory service
  ) {}

  //   Create a new order
  async createOrder(customerId?: string) {
    return this.prisma.order.create({
      data: {
        customerId,
        status: OrderStatus.DRAFT,
        totalAmount: 0,
      },
    });
  }

  //   Add an item to an order
  async addItem(
    orderId: string,
    productId: string,
    quantity: number,
    price: number,
    warehouseId: string, // warehouse to reduce stock from
  ) {
    // Fetch the order
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) throw new BadRequestException('Order not found');
    if (order.status !== OrderStatus.DRAFT)
      throw new BadRequestException('Cannot add items to a non-draft order');

    // Check stock
    const inventory = await this.prisma.inventoryItem.findUnique({
      where: { productId_warehouseId: { productId, warehouseId } },
    });

    if (!inventory || inventory.quantity < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    // Add item
    const orderItem = await this.prisma.orderItem.create({
      data: {
        orderId,
        productId,
        quantity,
        price,
      },
    });

    // Update totalAmount
    const newTotal =
      order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) +
      price * quantity;

    await this.prisma.order.update({
      where: { id: orderId },
      data: { totalAmount: newTotal },
    });

    return orderItem;
  }

  //   Get all orders
  async getOrders() {
    return this.prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  //   Update order status
  async updateStatus(orderId: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    if (!order) throw new BadRequestException('Order not found');

    // Only deduct stock when moving to CONFIRMED
    const isConfirmingOrder =
      order.status === OrderStatus.DRAFT && status === OrderStatus.CONFIRMED;

    if (isConfirmingOrder) {
      for (const item of order.items) {
        await this.inventoryService.stockOut(
          item.productId,
          item.warehouseId,
          item.quantity,
        );
      }
      if (
        order.status !== OrderStatus.DRAFT &&
        status === OrderStatus.CONFIRMED
      ) {
        throw new BadRequestException('order already processed');
      }

      // Optionally: validate status transitions here
      return this.prisma.order.update({
        where: { id: orderId },
        data: { status },
      });
    }
  }
}
