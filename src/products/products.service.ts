import { InjectModel } from '@nestjs/sequelize';
import { CreateProductRequest } from './dto/create-product.request';
import { Product } from './model/product.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}
  async createProduct(data: CreateProductRequest, userId: number) {
    try {
      const product = { ...data, userId };
      return await this.productModel.create<Product>(product as any);
    } catch (err) {
      console.log(err);
    }
  }

  async getProducts() {
    return await this.productModel.findAll<Product>();
  }
}
