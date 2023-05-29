import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { TMaybe } from '../../domain/models/entity';
import { EUserRole, User } from '../../domain/models/user/user.entity';
import { Expense } from 'src/domain/models/expense/expense.entity';
import { ICreateExpensePayload, IUpdateExpensePayload } from '../schemas/expenses.payloads';
import { ICreateUserPayload, IUpdateUserPayload } from '../schemas/users.payloads';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({relations: ['expenses']});
  }

  findOne(id: number): Promise<TMaybe<User>> {
    return this.usersRepository.findOne({where: {id}, relations: ['expenses']});
  }

  create(user: ICreateUserPayload): Promise<User> {
    const newDate = new Date();
    const newUser = this.usersRepository.create({
      role: EUserRole.MEMBER,
      createdAt: newDate,
      updatedAt: newDate,
      ...user
    });
    return this.usersRepository.save(newUser);
  }

  update(id: number, user: IUpdateUserPayload): Promise<User> {
    return this.usersRepository.save({...user, id: Number(id)});
  }

  delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  createExpense(user: User, expense: ICreateExpensePayload): Promise<Expense> {
    const newDate = new Date();
    const newExpense = this.expensesRepository.create({
      createdAt: newDate,
      updatedAt: newDate,
      date: expense.date ? new Date(expense.date) : undefined,
      ...expense,
      user
    });
    return this.expensesRepository.save(newExpense);
  }

  updateExpense(id: number, expense: IUpdateExpensePayload): Promise<Expense> {
    return this.expensesRepository.save({...expense, id: Number(id), updatedAt: new Date()});
  }

  deleteExpense(id: number): Promise<DeleteResult> {
    return this.expensesRepository.delete(id);
  }
}
