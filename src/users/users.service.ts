import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email: email } });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async createUser(data: CreateUserRequest): Promise<User> {
    try {
      const user = { ...data, password: await bcrypt.hash(data.password, 10) };
      return await this.userModel.create<User>(user as any);
    } catch (err) {
      if (err.errors[0].validatorKey === 'not_unique') {
        throw new UnprocessableEntityException('Email already exists');
      }
      console.log(err);
      throw err;
    }
  }
}
