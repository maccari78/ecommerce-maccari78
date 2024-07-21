import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'reviews' })
export class ReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    ratings: number

    @Column()
    comment: string

    @CreateDateColumn()
    createdAt: Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp

    @ManyToOne(() => UserEntity, (user) => user.reviews)
    user: UserEntity

    @ManyToOne(() => ProductEntity, (prod) => prod.reviews)
    product: ProductEntity

    @BeforeInsert()
    async generateUUID() {
        this.id = uuidv4();
    }
}
