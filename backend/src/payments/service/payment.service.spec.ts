import { Test, TestingModule } from '@nestjs/testing';
import { ReassignPaymentDto } from 'libs/database/dto/reassign-payment.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CustomerRepository } from 'libs/database/repository/customer.repository';
import { PaymentService } from './payment.service';
import { PaymentsRepository } from 'libs/database/repository/payments.repository';

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let mockPaymentsRepository: PaymentsRepository;
  let mockCustomersRepository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PaymentsRepository,
          useValue: {
            findById: jest.fn(),
            updateCustomer: jest.fn(),
          },
        },
        {
          provide: CustomerRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    paymentService = module.get<PaymentService>(PaymentService);
    mockPaymentsRepository = module.get<PaymentsRepository>(PaymentsRepository);
    mockCustomersRepository =
      module.get<CustomerRepository>(CustomerRepository);
  });

  describe('Reassign Payment', () => {
    // setup
    const mockReassignDto: ReassignPaymentDto = {
      paymentId: 'payment123',
      sourceCustomerId: 'customer1',
      targetCustomerId: 'customer2',
    };

    it('should successfully reassign a payment', async () => {
      const mockPayment = {
        _id: 'payment123',
        customer: {
          id: 'customer1',
        },
      };
      jest
        .spyOn(mockPaymentsRepository, 'findById')
        .mockResolvedValue(mockPayment as any);
      jest
        .spyOn(mockCustomersRepository, 'findOne')
        .mockResolvedValueOnce({ id: 'customer1' } as any)
        .mockResolvedValueOnce({ id: 'customer2' } as any);

      const updatedPayment = {
        ...mockPayment,
        customer: {
          ...mockPayment.customer,
          id: 'customer2',
        },
      };
      jest
        .spyOn(mockPaymentsRepository, 'updateCustomer')
        .mockResolvedValue(updatedPayment as any);

      const result = await paymentService.reassign(mockReassignDto);

      expect(result.customer.id).toBe('customer2');
      expect(mockPaymentsRepository.findById).toHaveBeenCalledWith(
        'payment123',
      );
      expect(mockCustomersRepository.findOne).toHaveBeenCalledTimes(2);
      expect(mockPaymentsRepository.updateCustomer).toHaveBeenCalledWith(
        'payment123',
        'customer2',
      );
    });

    it('should throw NotFoundException for non-existent payment', async () => {
      jest.spyOn(mockPaymentsRepository, 'findById').mockResolvedValue(null);

      await expect(paymentService.reassign(mockReassignDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException for invalid source customer', async () => {
      const mockPayment = {
        _id: 'payment123',
        customer: { id: 'customer1' },
      };

      jest
        .spyOn(mockPaymentsRepository, 'findById')
        .mockResolvedValue(mockPayment as any);
      jest.spyOn(mockCustomersRepository, 'findOne').mockResolvedValue(null);

      await expect(paymentService.reassign(mockReassignDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for payment not belonging to source customer', async () => {
      const mockPayment = {
        _id: 'payment123',
        customer: { id: 'differentCustomer' },
      };

      jest
        .spyOn(mockPaymentsRepository, 'findById')
        .mockResolvedValue(mockPayment as any);
      jest
        .spyOn(mockCustomersRepository, 'findOne')
        .mockResolvedValueOnce({ id: 'customer1' } as any)
        .mockResolvedValueOnce({ id: 'customer2' } as any);

      await expect(paymentService.reassign(mockReassignDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
