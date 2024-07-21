import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../products/entities/product.entity';
import { MulterFile } from '../utility/interfaces/multer-file.interface';
import { v2 } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class UploadImageService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) { }

  async uploadImageToCloudinary(file: MulterFile): Promise<string> {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    const cloudinaryConfig = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    };

    v2.config(cloudinaryConfig);

    const transformationOptions = {
      width: 100,
      height: 150,
      crop: 'fill',
      quality: 'auto',
      fetch_format: 'auto',
    };

    return new Promise((resolve, reject) => {
      const stream = v2.uploader.upload_stream({ folder: 'uploads', transformation: [transformationOptions] }, (error, result) => {
        if (error) {
          reject(new HttpException('Error loading image', HttpStatus.INTERNAL_SERVER_ERROR));
        } else {
          console.log(result.secure_url);

          resolve(result.secure_url);
        }
      });

      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }

  async updateProductImage(imageUrl: Express.Multer.File, productId: string): Promise<void> {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const img = await this.uploadImageToCloudinary(imageUrl)
    product.images = img;
    await this.productRepository.save(product);
  }
}
