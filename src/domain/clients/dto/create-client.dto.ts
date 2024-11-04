import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, Length } from "class-validator";
import { HasMinimumAge } from "common/decorators/has-minimum-age.decorator";

export class CreateClientDto {
    @Length(2,50)
    @ApiProperty({type: String, description:'Name of the client'})
    readonly name: string;
    @IsEmail()
    @ApiProperty({type: String, description:'email of the client'})
    readonly email: string;
    @IsPhoneNumber('CU')
    @ApiProperty({type: String, description:'phone number of the client'})
    readonly phone: string;
    // @IsAdult()
    @HasMinimumAge(18)
    @ApiProperty({type: Number, description:'age of the client'})
    readonly age: number;
}
