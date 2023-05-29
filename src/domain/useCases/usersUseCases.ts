import { UsersService } from '../../infrastructure/services/users.service';
import { User } from '../models/user/user.entity';
import { ICreateUserPayload, IUpdateUserPayload } from '../../infrastructure/schemas/users.payloads';
import { ICreateExpensePayload, IUpdateExpensePayload } from '../../infrastructure/schemas/expenses.payloads';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersUseCases {
  constructor(private readonly usersService: UsersService) {}

  getAllUsers() {
    return this.usersService.findAll();
  }

  getUserById(id: number) {
    return this.usersService.findOne(id);
  }

  createNewUser(user: ICreateUserPayload) {
    return this.usersService.create(user);
  }

  updateUserInfos(id: number, user: IUpdateUserPayload) {
    return this.usersService.update(id, user);
  }

  deleteUser(id: number) {
    return this.usersService.delete(id);
  }

  createExpense(user: User, expense: ICreateExpensePayload) {
    return this.usersService.createExpense(user, expense);
  }

  updateExpense(id: number, expense: IUpdateExpensePayload) {
    return this.usersService.updateExpense(id, expense);
  }

  deleteExpense(id: number) {
    return this.usersService.deleteExpense(id);
  }
}