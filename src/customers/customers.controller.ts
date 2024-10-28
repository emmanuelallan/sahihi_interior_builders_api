import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateInteractionDto } from './dto/create-interaction.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get('search')
  search(@Query('query') query: string) {
    return this.customerService.search(query);
  }

  @Get('filter')
  filter(@Query() criteria: Partial<CreateCustomerDto>) {
    return this.customerService.filter(criteria);
  }

  @Get('count')
  async countTotalCustomers() {
    return { count: await this.customerService.countTotalCustomers() };
  }

  @Get('count-leads')
  async countLeads() {
    return { count: await this.customerService.countLeads() };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

  @Post(':id/interactions')
  addInteraction(
    @Param('id') id: string,
    @Body() createInteractionDto: CreateInteractionDto,
  ) {
    return this.customerService.addInteraction(+id, createInteractionDto);
  }
}
