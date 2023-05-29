import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Expense, IExpense } from '../../domain/models/expense/expense.entity';
@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>
  ) {}

  findAll(): Promise<Expense[]> {
    return this.expensesRepository.find();
  }
}
