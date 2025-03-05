import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentsDto } from 'libs/database/dto/create-payments.dto';
import { ReassignPaymentDto } from 'libs/database/dto/reassign-payment.dto';
import { CustomerRepository } from 'libs/database/repository/customer.repository';
import { PaymentsRepository } from 'libs/database/repository/payments.repository';
import { PaymentsSchema } from 'libs/database/schema/payments.db';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

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

  async reassign(dto: ReassignPaymentDto): Promise<any> {
    try {
      const payment = await this.paymentsRepository.findById(dto.paymentId);
      if (!payment) {
        throw new NotFoundException('Payment not found');
      }

      const sourceCustomer = await this.customerRepository.findOne(
        dto.sourceCustomerId,
      );
      if (!sourceCustomer) {
        throw new BadRequestException('Source customer not found');
      }

      const targetCustomer = await this.customerRepository.findOne(
        dto.targetCustomerId,
      );
      if (!targetCustomer) {
        throw new BadRequestException('Target customer not found');
      }

      if (payment.customer.id !== dto.sourceCustomerId) {
        throw new BadRequestException(
          'Payment does not belong to the source customer',
        );
      }

      const updatedPayment = await this.paymentsRepository.updateCustomer(
        dto.paymentId,
        dto.targetCustomerId,
      );

      if (!updatedPayment) {
        throw new BadRequestException('Failed to reassign payment');
      }

      return updatedPayment;
    } catch (error) {
      throw error;
    }
  }
}
