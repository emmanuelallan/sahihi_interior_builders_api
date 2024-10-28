import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Customer } from './customers.entity';

@Entity()
export class CustomerInteraction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.interactions)
  customer: Customer;

  @Column()
  type: string; // e.g., 'phone', 'email'

  @Column()
  notes: string;

  @CreateDateColumn()
  created_at: Date;
}
