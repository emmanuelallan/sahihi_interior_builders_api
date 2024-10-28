import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  password_hash: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  kra_pin: string;

  @IsString()
  role: string;
}
