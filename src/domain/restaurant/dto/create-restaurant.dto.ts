import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";
import { IsCardinal } from "common/decorators/is-cardinal.decorator";

export class CreateRestaurantDto {

    @Length(2,50)
    @ApiProperty({type: String, description:'Name of the restaurant'})
    readonly name: string;
    @Length(2,50)
    @ApiProperty({type: String, description:'Description of the restaurant'})
    readonly description: string;
    @Length(2,50)
    @ApiProperty({type: String, description:'Address of the restaurant'})
    readonly address: string;
    @IsCardinal()
    @ApiProperty({type: Number, description:'Capacity of the restaurant'})
    readonly capacity: number;
}
