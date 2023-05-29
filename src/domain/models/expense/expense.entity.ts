import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { TEntity } from '../entity';

export enum ECurrency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP'
}

export interface IExpense {
  name: string;
  amount: number;
  currency: ECurrency;
  date?: Date;
  category?: string;
  user: User;
}

@Entity()
export class Expense extends TEntity implements IExpense {
  @Column()
  @ApiProperty({description: 'Name of the expense'})
  name: string;

  @Column()
  @ApiProperty({description: 'Amount of the expense'})
  amount: number;

  @Column()
  @ApiProperty({description: 'Currency of the expense'})
  currency: ECurrency;

  @Column()
  @ApiProperty({description: 'Date of the expense'})
  date: Date;

  @Column({nullable: true})
  @ApiProperty({description: 'Category of the expense'})
  category: string;

  @ManyToOne(() => User, user => user.expenses)
  user: User;
}
