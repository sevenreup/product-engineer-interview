import { Module } from '@nestjs/common';
import { CustomerRepository } from '../repository/customer.repository';
import { PaymentsRepository } from '../repository/payments.repository';
import { UserRepository } from '../repository/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '../schema/customer.db';
import { Payments, PaymentsSchema } from '../schema/payments.db';
import { User, UserSchema } from '../schema/user.db';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerSchema.name, schema: Customer },
      { name: PaymentsSchema.name, schema: Payments },
      { name: UserSchema.name, schema: User },
    ]),
  ],
  providers: [CustomerRepository, PaymentsRepository, UserRepository],
  exports: [CustomerRepository, PaymentsRepository, UserRepository],
})
export class DatabaseModule {}
