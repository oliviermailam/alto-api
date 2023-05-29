import { Body, Controller, Get, Post, Patch, Delete, NotFoundException, Param } from '@nestjs/common';
import { ApiBody, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

import { CreateUserSchema, ICreateUserPayload, UpdateUserSchema } from '../schemas/users.payloads';
import { User } from '../../domain/models/user/user.entity';
import { Expense } from '../../domain/models/expense/expense.entity';
import { CreateExpenseSchema, ICreateExpensePayload, IUpdateExpensePayload, UpdateExpenseSchema } from '../schemas/expenses.payloads';
import { UsersUseCases } from 'src/domain/useCases/usersUseCases';

@Controller('users')
@ApiTags('Utilisateurs')
export class UsersController {
  constructor(private readonly usersUseCases: UsersUseCases) {}

  // get all users
  @Get()
  @ApiOperation({summary: 'Récupérer tous les utilisateurs'})
  findAll(): Promise<User[]> {
    return this.usersUseCases.getAllUsers();
  }

  // get user by id
  @Get(':id')
  @ApiOperation({summary: 'Récupérer un utilisateur par son id'})
  @ApiParam({name: 'id', required: true, type: Number})
  async findOne(@Param('id') id: string): Promise<User> {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new Error('Invalid user id');
    }
    const user = await this.usersUseCases.getUserById(parsedId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // create user
  @Post()
  @ApiOperation({summary: 'Créer un utilisateur'})
  @ApiBody({schema: CreateUserSchema})
  create(@Body() user: ICreateUserPayload): Promise<User> {
    return this.usersUseCases.createNewUser(user);
  }

  // update user
  @Patch(':id')
  @ApiOperation({summary: 'Mettre à jour un utilisateur'})
  @ApiParam({name: 'id', required: true, type: Number})
  @ApiBody({schema: UpdateUserSchema})
  update(@Param('id') userId: string, @Body() user: Partial<User>): Promise<User> {
    const parsedId = parseInt(userId, 10);
    if (isNaN(parsedId)) {
      throw new Error('Invalid user id');
    }
    return this.usersUseCases.updateUserInfos(parsedId, user);
  }

  // delete user
  @Delete(':id')
  @ApiOperation({summary: 'Supprimer un utilisateur'})
  @ApiParam({name: 'id', required: true, type: Number})
  async delete(@Param('id') userId: string): Promise<void> {
    const parsedId = parseInt(userId, 10);
    if (isNaN(parsedId)) {
      throw new Error('Invalid user id');
    }

    const deleteResult = await this.usersUseCases.deleteUser(parsedId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  // create user expense
  @Post(':id/expenses')
  @ApiOperation({summary: 'Créer une dépense pour un utilisateur'})
  @ApiParam({name: 'id', required: true, type: Number})
  @ApiBody({schema: CreateExpenseSchema})
  async createExpense(@Param('id') userId: string, @Body() expense: ICreateExpensePayload): Promise<Expense> {
    const parsedId = parseInt(userId, 10);
    if (isNaN(parsedId)) {
      throw new Error('Invalid user id');
    }
    const user = await this.usersUseCases.getUserById(parsedId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersUseCases.createExpense(user, expense);
  }

  // update user expense
  @Patch(':id/expenses/:expenseId')
  @ApiOperation({summary: 'Mettre à jour une dépense pour un utilisateur'})
  @ApiParam({name: 'id', required: true, type: Number})
  @ApiParam({name: 'expenseId', required: true, type: Number})
  @ApiBody({schema: UpdateExpenseSchema})
  async updateExpense(
    @Param('id') userId: string,
    @Param('expenseId') expenseId: string,
    @Body() expense: IUpdateExpensePayload
  ): Promise<Expense> {
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid user id');
    }
    const parsedExpenseId = parseInt(expenseId, 10);
    if (isNaN(parsedExpenseId)) {
      throw new Error('Invalid expense id');
    }
    const user = await this.usersUseCases.getUserById(parsedUserId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.expenses.every(expense => expense.id !== parsedExpenseId)) {
      throw new NotFoundException('Expense not found');
    }
    return this.usersUseCases.updateExpense(parsedExpenseId, expense);
  }

  // delete user expense
  @Delete(':id/expenses/:expenseId')
  @ApiOperation({summary: 'Supprimer une dépense pour un utilisateur'})
  @ApiParam({name: 'id', required: true, type: Number})
  @ApiParam({name: 'expenseId', required: true, type: Number})
  async deleteExpense(
    @Param('id') userId: string,
    @Param('expenseId') expenseId: string
  ): Promise<void> {
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid user id');
    }
    const parsedExpenseId = parseInt(expenseId, 10);
    if (isNaN(parsedExpenseId)) {
      throw new Error('Invalid expense id');
    }
    const user = await this.usersUseCases.getUserById(parsedUserId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.expenses.every(expense => expense.id !== parsedExpenseId)) {
      throw new NotFoundException('Expense not found');
    }
    const deleteResult = await this.usersUseCases.deleteExpense(parsedExpenseId);
    if (deleteResult.affected === 0) {
      throw new NotFoundException('Expense not found');
    }
  }
}
