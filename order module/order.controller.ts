import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './order.service';
import {
  CreateOrderDto,
  AddOrderItemDto,
  UpdateOrderStatusDto,
} from './dto/order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.getOrders();
  }

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto.customerId);
  }

  @Post(':id/items')
  addItem(@Param('id') orderId: string, @Body() dto: AddOrderItemDto) {
    const { productId, quantity, warehouseId } = dto;
    return this.ordersService.addItem(
      orderId,
      productId,
      quantity,
      warehouseId,
    );
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') orderId: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(orderId, dto.status);
  }
}
