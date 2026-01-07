import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './order.service';
import {
  CreateOrderDto,
  AddOrderItemDto,
  UpdateOrderStatusDto,
} from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto.customerId);
  }

  @Post(':id/items')
  addItem(@Param('id') orderId: string, @Body() dto: AddOrderItemDto) {
    return this.ordersService.addItem(
      orderId,
      dto.productId,
      dto.quantity,
      dto.price,
    );
  }

  @Get()
  findAll() {
    return this.ordersService.getOrders();
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') orderId: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(orderId, dto.status);
  }
}
