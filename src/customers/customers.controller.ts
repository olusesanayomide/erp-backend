import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Master Data : Customer')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({
    summary: 'Register a new customer',
    description:
      'Creates a customer record in the registry for sales transactions.',
  })
  @ApiResponse({ status: 201, description: 'Customer created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Validation failed or Email already exists.',
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all customers',
    description:
      'Returns a list of all registered customers with their total order counts.',
  })
  @ApiResponse({ status: 200, description: 'List retrieved successfully.' })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get customer by ID',
    description:
      'Returns full profile and order history for a specific customer.',
  })
  @ApiResponse({ status: 200, description: 'Customer found.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update customer details',
    description: 'Partially update customer contact info or name.',
  })
  @ApiResponse({ status: 200, description: 'Customer updated successfully.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove customer',
    description:
      'Deletes a customer from the registry. Fails if customer has existing orders.',
  })
  @ApiResponse({ status: 200, description: 'Customer deleted successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Cannot delete customer with order history.',
  })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.customersService.remove(id);
  }
}
