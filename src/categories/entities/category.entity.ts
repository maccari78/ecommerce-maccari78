import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { v4 as uuidv4 } from 'uuid';
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({ name: 'categories' })
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn()
    createdAt: Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp

    @ManyToOne(() => UserEntity, (user) => user.categories)
    addedBy: UserEntity

    @OneToMany(() => ProductEntity, (prod) => prod.category)
    products: ProductEntity[]

    @BeforeInsert()
    async generateUUID() {
        this.id = uuidv4();
    }
}
