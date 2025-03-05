import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDto } from 'libs/database/dto/create-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.customerService.getAllCustomers();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateCustomerDto) {
    return this.customerService.createCustomer(dto);
  }
}
