import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PaymentService } from '../service/payment.service';
import { CreatePaymentsDto } from 'libs/database/dto/create-payments.dto';
import { ReassignPaymentDto } from 'libs/database/dto/reassign-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.paymentsService.getAllPayments();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreatePaymentsDto) {
    return this.paymentsService.createPayment(dto);
  }

  @Put('reassign')
  @UseGuards(JwtAuthGuard)
  reassign(@Body() dto: ReassignPaymentDto) {
    return this.paymentsService.reassign(dto);
  }
}
