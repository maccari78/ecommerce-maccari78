import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';

@Injectable()
export class ProductsSeeder {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async seed() {
    const productsData = [
      {
        title: "Iphone 15",
        description: "The best smartphone in the world",
        price: 899.99,
        stock: 15,
        images: "https://d2ihpvt6nd5q28.cloudfront.net/wp-content/uploads/2023/12/iPhone15_Pink_PDP_Image_Position-1__MXLA.jpg",
        category: { title: 'smartphone' },
      },
      {
        title: "Samsung Galaxy S23",
        description: "The best smartphone in the world",
        price: 759.99,
        stock: 12,
        images: "https://images.start.com.ar/SM-S918BZKVARO-2.jpg",
        category: { title: 'smartphone' },
      },
      {
        title: "Motorola Edge 40",
        description: "The best smartphone in the world",
        price: 679.89,
        stock: 12,
        images: "https://images.fravega.com/f1000/e8b9fbbbd0bc9cfbd89147c91f7eba3f.jpg",
        category: { title: 'smartphone' },
      },
      {
        title: "Samsung Odyssey G9",
        description: "The best monitor in the world",
        price: 299.99,
        stock: 6,
        images: "https://images.fravega.com/f1000/c6320328a79f21e1e1cdfbc2f0d694fc.jpg",
        category: { title: 'monitor' },
      },
      {
        title: "LG UltraGear",
        description: "The best monitor in the world",
        price: 199.99,
        stock: 8,
        images: "https://microsites-production-latam.s3.amazonaws.com/uploads/1693227846-3.jpg",
        category: { title: 'monitor' },
      },
      {
        title: "Acer Predator",
        description: "The best monitor in the world",
        price: 249.999,
        stock: 2,
        images: "https://i.ebayimg.com/images/g/VDQAAOSwFbdiuT3j/s-l1200.jpg",
        category: { title: 'monitor' },
      },
      {
        title: "Razer BlackWidow V3",
        description: "The best keyboard in the world",
        price: 99.99,
        stock: 10,
        images: "https://front.dev.malditohard.com.ar/img/migration/TECLADO-GAMER-RAZER-BLACKWIDOW-V3-GREEN-SP.webp",
        category: { title: 'keyboard' },
      },
      {
        title: "Corsair K70",
        description: "The best keyboard in the world",
        price: 79.99,
        stock: 5,
        images: "https://deventas.com/wp-content/uploads/2023/09/Diseno-sin-titulo-2023-11-03T001548.412.jpg",
        category: { title: 'keyboard' },
      },
      {
        title: "Logitech G Pro",
        description: "The best keyboard in the world",
        price: 59.99,
        stock: 11,
        images: "https://promart.vteximg.com.br/arquivos/ids/4592347-1000-1000/image-fca1ec8a24324f18b6a9b48b63a6d422.jpg?v=637812687783130000",
        category: { title: 'keyboard' },
      },
      {
        title: "Razer Viper",
        description: "The best mouse in the world",
        price: 49.99,
        stock: 17,
        images: "https://aypcomputacion.com/wp-content/uploads/2022/02/2-24.jpg",
        category: { title: 'mouse' },
      },
      {
        title: "Logitech G502 Pro",
        description: "The best mouse in the world",
        price: 39.99,
        stock: 14,
        images: "https://i0.wp.com/hardcorecomputacion.com.ar/wp-content/uploads/2024/02/651851_432831_01_front_zoom.jpg?fit=1000%2C1000&ssl=1",
        category: { title: 'mouse' },
      },
      {
        title: "SteelSeries Rival 3",
        description: "The best mouse in the world",
        price: 29.99,
        stock: 20,
        images: "https://www.phi-digital.com/wp-content/uploads/2021/11/Mouse-PC-SteelSeries-Rival-52.jpg",
        category: { title: 'mouse' },
      }
    ];

    for (const productData of productsData) {
      const existingProduct = await this.productsRepository.findOne({ where: { title: productData.title } });
  
      if (!existingProduct) {
        await this.productsRepository.save(productData);
      }
    }
  }
}
