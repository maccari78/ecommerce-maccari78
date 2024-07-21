import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from "../enums/order-status.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { ShippingEntity } from "./shipping.entity";
import { OrdersProductsEntity } from "./orders-products.entity";

@Entity({ name: "orders" })
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    orderAt: Timestamp

    @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PROCESSING })
    status: string

    @Column({ nullable: true })
    shippedAt: Date

    @Column({ nullable: true })
    deliveredAt: Date

    @Column({ type: 'uuid' })
    userId: string;

    @ManyToOne(() => UserEntity, (user) => user.ordersUpdateBy)
    updatedBy: UserEntity

    @OneToOne(() => ShippingEntity, (ship) => ship.order, { cascade: true })
    @JoinColumn()
    shippingAddress: ShippingEntity

    @OneToMany(() => OrdersProductsEntity, (op) => op.order, { cascade: true })
    products: OrdersProductsEntity[]

    @ManyToOne(() => UserEntity, (user) => user.orders)
    user: UserEntity

    @BeforeInsert()
    async generateUUID() {
        this.id = uuidv4();
    }
}
