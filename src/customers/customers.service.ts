import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customers.entity';
import { CustomerInteraction } from './customer-interaction.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateInteractionDto } from './dto/create-interaction.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(CustomerInteraction)
    private interactionRepository: Repository<CustomerInteraction>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ relations: ['interactions'] });
  }

  async findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOne({
      where: { id },
      relations: ['interactions'],
    });
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    await this.customerRepository.update(id, updateCustomerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }

  async search(query: string): Promise<Customer[]> {
    return this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.first_name LIKE :query', { query: `%${query}%` })
      .orWhere('customer.last_name LIKE :query', { query: `%${query}%` })
      .orWhere('customer.company_name LIKE :query', { query: `%${query}%` })
      .orWhere('customer.email LIKE :query', { query: `%${query}%` })
      .getMany();
  }

  async filter(criteria: Partial<Customer>): Promise<Customer[]> {
    return this.customerRepository.find({ where: criteria });
  }

  async addInteraction(
    customerId: number,
    createInteractionDto: CreateInteractionDto,
  ): Promise<CustomerInteraction> {
    const customer = await this.findOne(customerId);
    const interaction = new CustomerInteraction();
    interaction.customer = customer;
    interaction.type = createInteractionDto.type;
    interaction.notes = createInteractionDto.notes;
    return this.interactionRepository.save(interaction);
  }

  async countTotalCustomers(): Promise<number> {
    return this.customerRepository.count();
  }

  async countLeads(): Promise<number> {
    return this.customerRepository.count({ where: { lead_status: 'new' } });
  }
}
