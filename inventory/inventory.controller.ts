import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ApiTags } from '@nestjs/swagger';
import { StockMovementDto } from './dto/stock-movement.dto';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getAllInventory() {
    return this.inventoryService.getInventory();
  }

  @Get(':warehouseId')
  async getWarehouseInventory(@Param('warehouseId') warehouseId: string) {
    return this.inventoryService.getInventoryByWarehouse(warehouseId);
  }

  @Get('movements')
  async getStockMovements(
    @Query('page') _page = 1,
    @Query('limit') _limit = 10,
  ) {
    return this.inventoryService.getStockMovements(+_page, +_limit);
  }

  @Post('stock-in')
  async stockIn(@Body() dto: StockMovementDto) {
    const { productId, warehouseId, quantity } = dto;
    return this.inventoryService.stockIn(productId, warehouseId, quantity);
  }

  @Post('stock-out')
  async stockOut(@Body() dto: StockMovementDto) {
    const { productId, warehouseId, quantity } = dto;
    return this.inventoryService.stockOut(productId, warehouseId, quantity);
  }
}
