import { ECurrency } from '../../domain/models/expense/expense.entity';

export interface ICreateExpensePayload {
  name: string;
  amount: number;
  currency: ECurrency;
  date?: string;
  category?: string;
}

export const CreateExpenseSchema = {
  type: 'object',
  properties: {
    name: {type: 'string'},
    amount: {type: 'number'},
    currency: {type: 'string', enum: Object.values(ECurrency)},
    category: {type: 'string'},
    date: {type: 'string', format: 'date-time'}
  },
  required: ['name', 'amount', 'currency'],
  additionalProperties: false
};

export interface IUpdateExpensePayload {
  name?: string;
  amount?: number;
  currency?: ECurrency;
  category?: string;
}

export const UpdateExpenseSchema = {
  type: 'object',
  properties: {
    name: {type: 'string'},
    amount: {type: 'number'},
    currency: {type: 'string', enum: Object.values(ECurrency)},
    category: {type: 'string'},
    date: {type: 'string', format: 'date-time'}
  },
  required: [],
  additionalProperties: false
};
