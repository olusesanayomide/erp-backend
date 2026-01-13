import { Body, Controller, Patch, Post, Param, Get } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Purchase')
@Controller()
export class PurchaseContoller {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a Purchase Order',
    description:
      'Initializes a new PO from a supplier. This does not increase inventory until the items are received.',
  })
  @ApiResponse({ status: 201, description: 'Purchase Order created.' })
  @ApiResponse({ status: 404, description: 'Supplier or Product not found.' })
  async create(@Body() dto: CreatePurchaseDto) {
    return await this.purchaseService.createPurchase(dto);
  }

  @Patch(':id/receive')
  @ApiOperation({
    summary: 'Receive Goods',
    description:
      'Marks the PO as RECEIVED and triggers a positive StockMovement (Stock-In) in the ledger for each item.',
  })
  @ApiResponse({
    status: 200,
    description: 'Goods received and inventory updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Order already received or cancelled.',
  })
  async receive(@Param('id') id: string) {
    return await this.purchaseService.recievePurchase(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get PO details',
    description:
      'Fetches the full details of a Purchase Order, including line items and delivery status.',
  })
  @ApiResponse({ status: 200, description: 'PO details retrieved.' })
  @ApiResponse({ status: 404, description: 'Purchase Order not found.' })
  async findOne(@Param('id') id: string) {
    return await this.purchaseService.getPurchaseDetails(id);
  }
}
