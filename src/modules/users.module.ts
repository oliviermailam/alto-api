import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from '../infrastructure/controllers/users.controller';
import { UsersUseCases } from 'src/domain/useCases/usersUseCases';
import { UsersService } from '../infrastructure/services/users.service';

import { User } from '../domain/models/user/user.entity';
import { Expense } from 'src/domain/models/expense/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Expense])],
  controllers: [UsersController],
  providers: [UsersService, UsersUseCases],
})
export class UsersModule {}
