import { IsOptional, IsEmail, IsEnum } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  first_name?: string;

  @IsOptional()
  last_name?: string;

  @IsOptional()
  company_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  phone_number?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  @IsEnum(['new', 'contacted', 'qualified', 'lost', 'converted'])
  lead_status?: string;
}
