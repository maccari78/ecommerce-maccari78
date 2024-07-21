import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator"

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Title can not be blank' })
    @IsString()
    title: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Description can not be empty' })
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Price should not be empty' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price should be number & max decimal precission 2' })
    @IsPositive({ message: 'Price should be positive number' })
    price: number

    @ApiProperty()
    @IsNotEmpty({ message: 'Stock should not be empty' })
    @IsNumber({}, { message: 'Stock should be number' })
    @Min(0,{message:'Stock can not be negative'})
    stock: number

    @ApiProperty()
    @IsNotEmpty({ message: 'Image URL should not be empty' })
    @IsString()
    imageUrl: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Category should not be empty' })
    @IsNumber({}, { message: 'Category id should be a number' })
    categoryId: number
}
