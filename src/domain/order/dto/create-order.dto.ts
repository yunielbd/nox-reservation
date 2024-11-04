import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";
import { IsEntity } from "common/decorators/is-entity.decorator";
import { IdDto } from "common/dto/id.dto";


export class CreateOrderDto {
    
    @IsEntity()
    @ApiProperty({type: IdDto, description: 'Client ID'  })
    readonly clientId: IdDto;

    @IsEntity()
    @ApiProperty({type: IdDto, description: 'Restaurant ID'  })
    readonly restaurantId: IdDto;

    @Length(1, 255)
    @ApiProperty({type: String, description: 'Order description'  })
    readonly description: string;
}
