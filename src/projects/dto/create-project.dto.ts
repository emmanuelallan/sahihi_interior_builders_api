import { IsString, IsDateString, IsInt } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsString()
  status: string;

  @IsInt()
  project_manager_id: number;

  @IsInt()
  engineer_id: number;
}
