import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersProductsEntity } from 'src/orders/entities/orders-products.entity';

@Injectable()
export class OrdersProductsSeeder {
    constructor(
        @InjectRepository(OrdersProductsEntity)
        private readonly ordersProductsRepository: Repository<OrdersProductsEntity>,
    ) { }

    async seed() {
        // console.log('Seeding orders products...');
        const ordersProductsData = [
            {
                product_unit_price: 759.99,
                product_quantity: 7,
                id: "107c569f-0dca-4415-a01d-a0e29b5349f3",
                orderId: "d72235a1-89f3-4c5d-9320-1132b6fea40a",
                productId: "459017b9-ffd9-46c6-a0ee-2dba2d42e2c6"
            },
            {
                product_unit_price: 249.99,
                product_quantity: 3,
                id: "68f73335-b98f-4e19-8a2b-63f174fd0c1b",
                orderId: "ed4a016f-da44-4634-abbe-16a5da3f6578",
                productId: "232fb47a-710b-43d3-9156-e31495ea265c"
            },
            {
                product_unit_price: 249.99,
                product_quantity: 1,
                id: "baf62891-2e81-4508-b64a-202561c5b082",
                orderId: "a1855c92-839f-4c20-9928-3d26cbaac76e",
                productId: "232fb47a-710b-43d3-9156-e31495ea265c"
            },
            {
                product_unit_price: 759.99,
                product_quantity: 18,
                id: "e88408c5-f66c-4675-98b7-9a93e36cdef0",
                orderId: "602500ab-dbf6-4b03-8453-dbee5e60d6d6",
                productId: "459017b9-ffd9-46c6-a0ee-2dba2d42e2c6"
            },
            {
                product_unit_price: 249.99,
                product_quantity: 6,
                id: "fd08655f-c576-4a7b-a9c7-cbb295924591",
                orderId: "e09f5ecc-c61c-4e14-b614-b50c34025611",
                productId: "232fb47a-710b-43d3-9156-e31495ea265c"
            }
        ];

        for (const orderProductsData of ordersProductsData) {
            const existingOrderProduct = await this.ordersProductsRepository.findOne({ where: { id: orderProductsData.id } });

            if (!existingOrderProduct) {
                await this.ordersProductsRepository.save(orderProductsData);
            }
        }
    }
}