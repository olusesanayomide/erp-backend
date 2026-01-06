import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ProductDto, UpdateProductDto } from './dto/product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //   get all products
  @Get()
  async getAllProducts() {
    return this.productService.getAll();
  }

  //   get product by id
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  //   create product
  @Post()
  async create(@Body() dto: ProductDto): Promise<Product> {
    return this.productService.createproduct(dto);
  }

  // Update a product
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, dto);
  }

  //  Delete a product
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
