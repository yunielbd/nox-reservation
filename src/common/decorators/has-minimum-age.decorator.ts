import { applyDecorators } from '@nestjs/common';
import { IsInt, IsPositive, registerDecorator, Validate, validate, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

/**
 * Checks if the value is a positive integer greater than the given age
 */
export function HasMinimumAge(minAge: number, validationOptions?: ValidationOptions) {  
    return function (object: Object, propertyName: string) {  
      registerDecorator({  
        name: 'isMinimumAge',  
        target: object.constructor,  
        propertyName: propertyName,  
        constraints: [minAge], 
        options: validationOptions,  
        validator: IsMinimumAgeConstraint,  
      });  
    };  
  }  

@ValidatorConstraint({ async: false })  
class IsMinimumAgeConstraint implements ValidatorConstraintInterface {  
  validate(value: number, args: ValidationArguments) {  
    const [minAge] = args.constraints; // get the age from the constrains  
    return value > minAge; // Compare minimum and given ages
  }  

  defaultMessage(args: ValidationArguments) {  
    const [minAge] = args.constraints;   
    return `La edad debe ser mayor que ${minAge}.`; // dynamic default error message if validation fails  
  }  
}   
