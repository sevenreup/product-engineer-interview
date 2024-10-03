import { Injectable } from '@nestjs/common';
import { CreatePaymentsDto } from 'libs/database/dto/create-payments.dto';
import { PaymentsRepository } from 'libs/database/repository/payments.repository';
import { PaymentsSchema } from 'libs/database/schema/payments.db';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async getAllPayments(): Promise<PaymentsSchema[]> {
    try {
      const payments = await this.paymentsRepository.findAll();
      return payments;
    } catch (error) {
      throw error;
    }
  }

  async createPayment(dto: CreatePaymentsDto): Promise<PaymentsSchema> {
    try {
      const payments = await this.paymentsRepository.create(dto);
      return payments;
    } catch (error) {
      throw error;
    }
  }

  async reassign(): Promise<any> {
    try {
      // TODO
    } catch (error) {
      throw error;
    }
  }
}
