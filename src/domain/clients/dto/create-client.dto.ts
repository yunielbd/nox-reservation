import { IsEmail, IsNumber, IsPhoneNumber, IsString, Length } from "class-validator";

export class CreateClientDto {
    @Length(2,50)
    name: string;
    @IsEmail()
    email: string;
    @IsPhoneNumber('CU')
    phone: string;
    @IsNumber()
    age: number;
}
