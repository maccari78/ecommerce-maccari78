import { Injectable } from '@nestjs/common';
import { CategoriesSeeder } from './categories.seed';
import { ProductsSeeder } from './products.seed';
import { UsersSeeder } from './users.seed';

@Injectable()
export class SeederService {
  constructor(
    private readonly categoriesSeeder: CategoriesSeeder,
    private readonly productsSeeder: ProductsSeeder,
    private readonly usersSeeder: UsersSeeder,
  ) {}

  async seed() {
    await this.categoriesSeeder.seed();
    await this.productsSeeder.seed();
    await this.usersSeeder.seed();
  }
}
