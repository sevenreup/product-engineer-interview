import { IsNotEmpty, IsString } from 'class-validator';

export class ReassignPaymentDto {
  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @IsNotEmpty()
  @IsString()
  sourceCustomerId: string;

  @IsNotEmpty()
  @IsString()
  targetCustomerId: string;
}
