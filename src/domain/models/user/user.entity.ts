import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany } from 'typeorm';
import { Expense } from '../expense/expense.entity';
import { TEntity } from '../entity';

export enum EUserRole {
  MANAGER = 'manager',
  MEMBER = 'member'
}

export interface IUser {
  email: string;
  firstName?: string;
  lastName?: string;
  role?: EUserRole;
}

@Entity()
export class User extends TEntity implements IUser {
  @Column()
  @ApiProperty({description: 'Email of the user'})
  email: string;

  @Column({nullable: true})
  @ApiProperty({description: 'First name of the user', required: false})
  firstName?: string;

  @Column({nullable: true})
  @ApiProperty({description: 'Last name of the user',required: false})
  lastName?: string;

  @Column()
  @ApiProperty({description: 'User role', enum: EUserRole, default: EUserRole.MEMBER, required: false})
  role?: EUserRole;

  @OneToMany(() => Expense, expense => expense.user)
  expenses: Expense[];
}