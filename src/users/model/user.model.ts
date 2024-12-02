import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/products/model/product.model';

@Table
export class User extends Model {
  @Column
  email: string;
  @Column
  password: string;
  @HasMany(() => Product, 'userId')
  products: Product[];
}
