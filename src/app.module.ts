import { MiddlewareConsumer, Module, OnModuleInit, RequestMethod } from '@nestjs/common';
import { dataSourceOptions } from 'db/data-source';
import { CurrentUserMiddleware } from './utility/middlewares/current-user.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';
import { UploadImageModule } from './upload-image/upload-image.module';
import { SeederService } from './utility/seeds/seeder.service';
import { CategoriesSeeder } from './utility/seeds/categories.seed';
import { ProductsSeeder } from './utility/seeds/products.seed';
import { UsersSeeder } from './utility/seeds/users.seed';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RemoveNullAndRolesInterceptor } from './utility/interceptors/remove.interceptor'; 
import { SeederController } from './utility/seeds/seeder.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), CategoriesModule, ProductsModule, UsersModule, UploadImageModule, OrdersModule, ReviewsModule, 
  ],
  controllers: [SeederController],
  providers: [ SeederService, CategoriesSeeder, ProductsSeeder, UsersSeeder, 
    
    {
      provide: APP_INTERCEPTOR,
      useClass: RemoveNullAndRolesInterceptor, 
    }, 
    
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) { }

  async onModuleInit() {
    await this.seederService.seed();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}


