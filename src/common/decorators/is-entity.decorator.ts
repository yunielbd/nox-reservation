import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IdDto } from '../dto/id.dto';

/**
 * Checks if the value is onject with only a serial Id
 */
export const IsEntity = (): PropertyDecorator =>
  applyDecorators(
    ValidateNested(),
    Type(() => IdDto),
  );
