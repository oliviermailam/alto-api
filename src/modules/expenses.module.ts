import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpensesController } from '../infrastructure/controllers/expenses.controller';
import { ExpensesService } from '../infrastructure/services/expenses.service';
import { Expense } from '../domain/models/expense/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  providers: [ExpensesService],
  controllers: [ExpensesController]
})
export class ExpensesModule {}
