import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto{

    @IsEmail()
    email:String

    @IsString()
    @MinLength(6)
    password:String
}