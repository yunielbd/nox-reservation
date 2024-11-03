import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsPhoneNumber, IsPositive, IsString, Length } from "class-validator";
import { HasMinimumAge } from "common/decorators/has-minimum-age.decorator";
import { IsAdult } from "common/decorators/is-adult.decorator";

export class CreateClientDto {
    @Length(2,50)
    @ApiProperty({type: String, description:'Name of the client'})
    name: string;
    @IsEmail()
    @ApiProperty({type: String, description:'email of the client'})
    email: string;
    @IsPhoneNumber('CU')
    @ApiProperty({type: String, description:'phone number of the client'})
    phone: string;
    // @IsAdult()
    @HasMinimumAge(18)
    @ApiProperty({type: Number, description:'age of the client'})
    age: number;
}
