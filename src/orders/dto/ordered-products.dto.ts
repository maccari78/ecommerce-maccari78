import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator"

export class OrderedProductsDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Product can not be empty' })
    id: string

    @ApiProperty()
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price should be a number & max decimal precission is 2' })
    @IsPositive({ message: 'Price can not be negative' })
    product_unit_price: number

    @ApiProperty()
    @IsNumber({}, { message: 'Quantity should be a number' })
    @IsPositive({ message: 'Quantity can not be negative' })
    product_quantity: number
}