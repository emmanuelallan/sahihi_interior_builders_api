import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customers.controller';
import { CustomerService } from './customers.service';
import { Customer } from './customers.entity';
import { CustomerInteraction } from './customer-interaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerInteraction])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomersModule {}
