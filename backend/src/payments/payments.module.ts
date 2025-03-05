import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './service/payment.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentsModule {}
