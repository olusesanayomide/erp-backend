import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Query,
  NotFoundException,
} from '@nestjs/common';
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
    const items =
      await this.inventoryService.getInventoryByWarehouse(warehouseId);

    if (!items || items.length === 0) {
      throw new NotFoundException(
        'Warehouse not found or has no inventory items.',
      );
    }
    return items;
  }

  // @Get('movements')
  // async getStockMovements(
  //   @Query('page') page?: string,
  //   @Query('limit') limit?: string,
  // ) {
  //   const _page = Number(page) || 1;
  //   const _limit = Number(limit) || 10;
  //   return this.inventoryService.getStockMovements(_page, _limit);
  // }

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
