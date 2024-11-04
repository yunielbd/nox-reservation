import { ApiProperty } from "@nestjs/swagger";
import { IsCardinal } from "../decorators/is-cardinal.decorator";

export class IdDto {
  @ApiProperty({
    description: 'Use a cardinal number for the ID',
    example: 1,
  })
  @IsCardinal()
  readonly id: number;
}
