import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  //   Get all products
  async getAll(): Promise<any[]> {
    return this.prisma.product.findMany({
      include: {
        inventoryItems: true,
        orderItems: true,
        stockMovements: true,
      },
    });
  }

  //   Get product by ID
  async getById(Id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id: Id },
      include: {
        inventoryItems: true,
        orderItems: true,
        stockMovements: true,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  //   create product
  async createproduct(data: {
    name: string;
    sku: string;
    price: number;
  }): Promise<Product> {
    if (!data.name || !data.sku || data.price == null) {
      throw new NotFoundException('Missing required fields');
    }
    return this.prisma.product.create({
      data,
    });
  }

  //   Update product
  async updateProduct(
    id: string,
    data: { name?: string; sku?: string; price?: number },
  ): Promise<Product> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  //   Delete product
  async deleteProduct(id: string): Promise<Product> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
    return this.prisma.product.delete({ where: { id } });
  }
}
