import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
import { UserService } from 'src/modules/users/service';
import { Injectable } from '@nestjs/common';

  @ValidatorConstraint({ async: true })
  @Injectable()
  export class IsEmailNotExists implements ValidatorConstraintInterface {

    constructor(private readonly usersService: UserService) {
    }
  
    async validate(email: any) {
      const user = await this.usersService.findOneByEmail(email);
        return !user;
    }

    defaultMessage() {
        return "Email already exist";
      }
  }
  
  export function EmailNotExists(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailNotExists,
      });
    };
  }