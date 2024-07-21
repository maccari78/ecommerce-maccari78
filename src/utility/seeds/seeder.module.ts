import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../../db/data-source';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoriesSeeder } from './categories.seed';
import { ProductsSeeder } from './products.seed';
import { UsersSeeder } from './users.seed';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([CategoryEntity, ProductEntity, UserEntity]),
    OrdersModule,
  ],
  providers: [CategoriesSeeder, ProductsSeeder, UsersSeeder],
  exports: [CategoriesSeeder, ProductsSeeder, UsersSeeder],
})
export class SeedersModule { }
