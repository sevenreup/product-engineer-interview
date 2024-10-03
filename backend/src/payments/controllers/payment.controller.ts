import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PaymentService } from '../service/payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.paymentsService.getAllPayments();
  }
}
