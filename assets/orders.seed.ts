import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/orders/entities/order.entity';

@Injectable()
export class OrdersSeeder {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly ordersRepository: Repository<OrderEntity>,
    ) { }

    async seed() {
        // console.log('Seeding orders...');
        const ordersData = [
            {
                orderAt: "2024-04-13T18:02:14.322Z",
                status: "delivered",
                shippedAt: "2024-04-13T18:02:52.702Z",
                deliveredAt: "2024-05-03T20:49:04.023Z",
                id: "ed4a016f-da44-4634-abbe-16a5da3f6578",
                updatedById: "422a976a-0b85-49b3-afc1-f41faecc5259",
                shippingAddressId: "477613a5-5927-4a59-a34b-782773ef0bdb",
                userId: "422a976a-0b85-49b3-afc1-f41faecc5259"
              },
              {
                orderAt: "2024-05-03T20:50:57.146Z",
                status: "delivered",
                shippedAt: "2024-05-03T20:51:47.104Z",
                deliveredAt: "2024-05-03T20:52:18.182Z",
                id: "6eaede2f-b08d-49ba-9df6-05992914d8ee",
                updatedById: "422a976a-0b85-49b3-afc1-f41faecc5259",
                shippingAddressId: "75338358-5a2a-4727-9e34-9da9bef1721e",
                userId: "a9e8567f-b341-4358-b735-82b894511d25"
              },
              {
                orderAt: "2024-04-13T18:02:52.702Z",
                status: "shipped",
                shippedAt: "2024-04-13T18:02:52.702Z",
                deliveredAt: "2024-05-02T07:54:52.534Z",
                id: "d72235a1-89f3-4c5d-9320-1132b6fea40a",
                updatedById: "422a976a-0b85-49b3-afc1-f41faecc5259",
                shippingAddressId: "e024691e-3de3-483c-8503-22d7bd42d864",
                userId: "ad2eabff-d7ce-4a79-bd07-78acdee551e2"
              },
              {
                orderAt: "2024-04-13T18:00:10.035Z",
                status: "processing",
                shippedAt: "2024-04-13T18:02:52.702Z",
                deliveredAt: "2024-04-13T18:00:10.035Z",
                id: "602500ab-dbf6-4b03-8453-dbee5e60d6d6",
                updatedById: "422a976a-0b85-49b3-afc1-f41faecc5259",
                shippingAddressId: "b6e794f6-2459-47e1-a398-24f8ebb776d3",
                userId: "422a976a-0b85-49b3-afc1-f41faecc5259"
              },
              {
                orderAt: "2024-04-13T18:02:14.322Z",
                status: "cancelled",
                shippedAt: "2024-04-13T18:02:52.702Z",
                deliveredAt: "2024-04-13T18:00:10.035Z",
                id: "a1855c92-839f-4c20-9928-3d26cbaac76e",
                updatedById: "422a976a-0b85-49b3-afc1-f41faecc5259",
                shippingAddressId: "e729dc75-4472-4c1e-b133-27e4020bec85",
                userId: "422a976a-0b85-49b3-afc1-f41faecc5259"
              },
              {
                orderAt: "2024-04-13T18:02:14.322Z",
                status: "delivered",
                shippedAt: "2024-04-13T18:02:52.702Z",
                deliveredAt: "2024-04-13T18:00:10.035Z",
                id: "e09f5ecc-c61c-4e14-b614-b50c34025611",
                updatedById: "422a976a-0b85-49b3-afc1-f41faecc5259",
                shippingAddressId: "cbd99177-320d-4fa2-9dcc-171dd51870eb",
                userId: "ad2eabff-d7ce-4a79-bd07-78acdee551e2"
              }
        ];

        for (const orderData of ordersData) {
            const existingOrder = await this.ordersRepository.findOne({ where: { id: orderData.id } });

            if (!existingOrder) {
                await this.ordersRepository.save(orderData);
            }
        }
    }
}