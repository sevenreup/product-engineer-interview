import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [AuthModule, CustomersModule, PaymentsModule],
})
export class AppModule {}
