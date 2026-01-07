// orders.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(customerId?: string) {
    return this.prisma.order.create({
      data: {
        customerId,
        status: OrderStatus.DRAFT,
      },
    });
  }

  async addItem(
    orderId: string,
    productId: string,
    quantity: number,
    price: number,
  ) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.status !== OrderStatus.DRAFT) {
      throw new BadRequestException('Order is not editable');
    }

    return this.prisma.orderItem.create({
      data: {
        orderId,
        productId,
        quantity,
        price,
      },
    });
  }

  async getOrders() {
    return this.prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(orderId: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}
