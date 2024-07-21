import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Title can not be empty' })
    @IsString({ message: 'Title should be string' })
    title: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Description can not be empty' })
    @IsString({ message: 'Description should be string' })
    description: string
}
