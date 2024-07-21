import { IsNotEmpty, IsString } from "class-validator"
import { UserSignInDto } from "./user-signin.dto"
import { ApiProperty } from "@nestjs/swagger"

export class UserSignUpDto extends UserSignInDto{

    @ApiProperty()
    @IsNotEmpty({ message: 'Name can not be null' })
    @IsString({ message: 'Name should be string' })
    name: string
}