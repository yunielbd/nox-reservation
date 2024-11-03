import { applyDecorators } from '@nestjs/common';
import { IsInt, IsPositive, Validate, validate, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

/**
 * Checks if the value is a positive integer greater than 16
 */
export const IsAdult = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  applyDecorators(IsInt(validationOptions), Validate(IsGreaterThan16Constraint));

@ValidatorConstraint({ name: 'isGreaterThan16', async: false })  
class IsGreaterThan16Constraint implements ValidatorConstraintInterface {  
  validate(value: number) {  
    return value > 16; 
  }  

  defaultMessage() {  
    return 'Must be older than 16'; //default error message if validation fails  
  }  
}  
