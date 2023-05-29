import { Column, PrimaryGeneratedColumn } from 'typeorm';

export type TMaybe<T> = T | null | undefined;

export interface IEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class TEntity implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  static sortByDate(a: IEntity, b: IEntity): number {
    return a.updatedAt.getTime() - b.updatedAt.getTime();
  }
}