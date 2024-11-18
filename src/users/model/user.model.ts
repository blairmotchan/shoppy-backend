import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  email: string;
  @Column
  password: string;
}