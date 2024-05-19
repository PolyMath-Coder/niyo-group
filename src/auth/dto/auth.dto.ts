import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string


    @IsNotEmpty()
    @IsString()
    password: string
}

export class LoginDto {
    @IsNotEmpty()
    _id: ObjectId

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string


    @IsNotEmpty()
    @IsString()
    password: string
}
