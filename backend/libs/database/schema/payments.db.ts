import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CustomerSchema } from './customer.db';

@Schema({
  timestamps: true,
  collection: 'payments',
})
export class PaymentsSchema extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  referenceId: string;

  @Prop({
    required: true,
  })
  amount: number;

  @Prop({
    type: { type: MongooseSchema.Types.ObjectId, ref: CustomerSchema.name },
  })
  customer: CustomerSchema;

  @Prop({
    default: 0,
  })
  version: number;

  createdAt: Date;

  updatedAt: Date;
}

export const Payments = SchemaFactory.createForClass(PaymentsSchema);
