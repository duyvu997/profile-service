/* tslint:disable max-classes-per-file */
import {
  ValidationArguments,
  Validator,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ name: "isIntergerNumber", async: false })
export class IsIntergerNumber implements ValidatorConstraintInterface {
  public validate(propertyValue: string, args: ValidationArguments) {
    return Number.isInteger(Number(propertyValue));
  }
}

@ValidatorConstraint({ name: "isPositiveNumberString", async: false })
export class IsPositiveNumberString implements ValidatorConstraintInterface {
  public validate(propertyValue: string, args: ValidationArguments) {
    const validator = new Validator();
    return validator.isPositive(Number(propertyValue));
  }
}
