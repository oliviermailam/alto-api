import { EUserRole } from '../../domain/models/user/user.entity';

export interface ICreateUserPayload {
  email: string;
  firstName?: string;
  lastName?: string;
  role?: EUserRole;
}

export const CreateUserSchema = {
  type: 'object',
  properties: {
    email: {type: 'string'},
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    role: {type: 'string', enum: Object.values(EUserRole)}
  },
  required: ['email'],
  additionalProperties: false
};

export interface IUpdateUserPayload {
  firstName?: string;
  lastName?: string;
  role?: EUserRole;
}

export const UpdateUserSchema = {
  type: 'object',
  properties: {
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    role: {type: 'string', enum: Object.values(EUserRole)}
  },
  required: [],
  additionalProperties: false
};
