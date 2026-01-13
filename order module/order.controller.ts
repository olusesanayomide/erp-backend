import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './order.service';
import {
  CreateOrderDto,
  AddOrderItemDto,
  UpdateOrderStatusDto,
} from './dto/order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({
    summary: 'List all orders',
    description:
      'Returns a history of all customer orders, including their current statuses (PENDING, SHIPPED, etc.).',
  })
  @ApiResponse({ status: 200, description: 'List of orders retrieved.' })
  findAll() {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get order details',
    description:
      'Retrieves a single order by id, including alll associated line items and product  details',
  })
  @ApiResponse({ status: 200, description: 'Order details found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Initialize a new order',
    description:
      'Creates a base order header linked to a Customer. Items must be added in a separate step.',
  })
  @ApiResponse({
    status: 201,
    description: 'Order header created successfully.',
  })
  @ApiResponse({ status: 404, description: 'Customer ID not found.' })
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto.customerId);
  }

  @Post(':id/items')
  @ApiOperation({
    summary: 'Add item to order',
    description:
      'Appends a product to an existing order. Note: This does not deduct stock until the status changes to SHIPPED.',
  })
  @ApiResponse({ status: 201, description: 'Item added to order.' })
  @ApiResponse({ status: 404, description: 'Order or Product not found.' })
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
  @ApiOperation({
    summary: 'Update order status',
    description:
      'Changes order state. Transitioning to "SHIPPED" or "COMPLETED" should trigger the negative StockMovements in the ledger.',
  })
  @ApiResponse({ status: 200, description: 'Status updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid status transition.' })
  updateStatus(
    @Param('id') orderId: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(orderId, dto.status);
  }
}
