import { InjectModel } from '@nestjs/sequelize';
import { CreateProductRequest } from './dto/create-product.request';
import { Product } from './model/product.model';
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

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
    const products = await this.productModel.findAll<Product>();

    return Promise.all(
      products.map(async (product) => this.convertProductPromise(product)),
    );
  }

  private async convertProductPromise(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageExists: await this.imageExists(product.id),
    };
  }

  private async imageExists(productId: number) {
    try {
      await fs.access(
        join(__dirname, '../../', `public/products/${productId}.jpeg`),
        fs.constants.F_OK,
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}
