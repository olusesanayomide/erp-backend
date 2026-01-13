import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ProductDto, UpdateProductDto } from './dto/product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //   get all products
  @Get()
  @ApiOperation({
    summary: 'List all products',
    description:
      'Retrieves the full catalog of products available in the system.',
  })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully.' })
  async getAllProducts() {
    return this.productService.getAll();
  }

  //   get product by id
  @Get(':id')
  @ApiOperation({
    summary: 'Get product by ID',
    description:
      'Fetches detailed information about a specific product using its UUID.',
  })
  @ApiResponse({ status: 200, description: 'Product found.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.getById(id);
  }

  //   create product
  @Post()
  @ApiOperation({
    summary: 'Create a new product',
    description:
      'Adds a new item to the master catalog. This does not set stock levels (use Inventory Stock-In for that).',
  })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  async create(@Body() dto: ProductDto): Promise<Product> {
    return this.productService.createproduct(dto);
  }

  // Update a product
  @Put(':id')
  @ApiOperation({
    summary: 'Update product details',
    description:
      'Modifies existing product information like name, SKU, or base price.',
  })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, dto);
  }

  //  Delete a product
  @Delete(':id')
  @ApiOperation({
    summary: 'Archive/Delete product',
    description:
      'Removes a product from the catalog. Note: This may fail if the product has existing transaction history.',
  })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict: Product is linked to existing orders.',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
