import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ExpensesService } from '../services/expenses.service';

@Controller('expenses')
@ApiTags('Dépenses')
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService
  ) {}

  // get all expenses
  @Get()
  @ApiOperation({summary: 'Récupérer toutes les dépenses'})
  findAll() {
    return this.expensesService.findAll();
  }
}
