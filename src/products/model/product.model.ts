import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/model/user.model';

@Table
export class Product extends Model {
  @Column
  name: string;
  @Column
  description: string;
  @Column
  price: number;
  @BelongsTo(() => User, 'userId')
  user: User;
}
