import { IsOptional } from 'class-validator';
import { IsCardinal } from '../decorators/is-cardinal.decorator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'The number of items to return',
    type: Number,
  })
  @IsOptional()
  @IsCardinal()
  readonly limit: number;
  @ApiPropertyOptional({
    description: 'The index of the first item to return',
    type: Number,
    default: 0,
  })
  @IsOptional()
  @IsCardinal()
  readonly offset: number;
}
