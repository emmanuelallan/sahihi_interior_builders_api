import { IsNotEmpty, IsEnum } from 'class-validator';

export class CreateInteractionDto {
  @IsNotEmpty()
  @IsEnum(['phone', 'email'])
  type: string;

  @IsNotEmpty()
  notes: string;
}