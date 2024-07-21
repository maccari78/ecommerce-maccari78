import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateShippingDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Phone can not be empty' })
    @IsString({ message: 'Phone format should be string' })
    phone: string

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'Name format should be string' })
    name: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Address can not be empty' })
    @IsString({ message: 'Address format should be string' })
    address: string

    @ApiProperty()
    @IsNotEmpty({ message: 'City can not be empty' })
    @IsString({ message: 'City format should be string' })
    city: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Postal code can not be empty' })
    @IsString({ message: 'Postal code format should be string' })
    postCode: string

    @ApiProperty()
    @IsNotEmpty({ message: 'State can not be empty' })
    @IsString({ message: 'State format should be string' })
    state: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Country can not be empty' })
    @IsString({ message: 'Country format should be string' })
    country: string
}