import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";

export class ProductsDto {
    @ApiProperty()
    @Expose()
    totalProducts: number

    @ApiProperty()
    @Expose()
    limit: number

    @ApiProperty()
    @Expose()
    @Type(() => ProductList)
    products: ProductList[]
}

export class ProductList {
    @ApiProperty()
    @Expose({ name: 'product_id' })
    id: string

    @ApiProperty()
    @Expose({ name: 'product_title' })
    title: string

    @ApiProperty()
    @Expose({ name: 'product_description' })
    description: string

    @ApiProperty()
    @Expose({ name: 'product_price' })
    price: number

    @ApiProperty()
    @Expose({ name: 'product_stock' })
    stock: number

    @ApiProperty()
    @Expose({ name: 'product_images' })
    @Transform(({ value }) => value.toString().split(','))
    images: string[]

    @Transform(({ obj }) => {
        return {
            id: obj.category_id,
            title: obj.category_title
        }
    })
    @ApiProperty()
    @Expose()
    category: any

    @ApiProperty()
    @Expose({ name: 'reviewcount' })
    review: number

    @ApiProperty()
    @Expose({ name: 'avgrating' })
    rating: number
}