import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  company_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  address: string;

  @IsEnum(['new', 'contacted', 'qualified', 'lost', 'converted'])
  lead_status: string;
}
