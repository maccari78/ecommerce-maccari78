import { BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { OrderEntity } from "./order.entity";

@Entity({ name: "shippings" })
export class ShippingEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    phone: string

    @Column({ default: ' ' })
    name: string

    @Column()
    address: string

    @Column()
    city: string

    @Column()
    postCode: string

    @Column()
    state: string

    @Column()
    country: string

    @OneToOne(() => OrderEntity, (order) => order.shippingAddress)
    order: OrderEntity

    @BeforeInsert()
    async generateUUID() {
        this.id = uuidv4();
    }
}