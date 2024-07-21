import { Module } from '@nestjs/common';
import { UploadImageController } from './upload-image.controller';
import { UploadImageService } from './upload-image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [UploadImageController],
  providers: [UploadImageService],
})
export class UploadImageModule { }
