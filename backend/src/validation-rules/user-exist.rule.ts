import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from 'src/modules/users/service';

@ValidatorConstraint({ async: true })
export class IsUserExists implements ValidatorConstraintInterface {

    constructor(private readonly usersService: UserService) {
    }

    async validate(id: number) {
        const user = await this.usersService.findById(id);
        return user ? true : false;
    }

    defaultMessage() {
        return "No user exists against the provided id";
    }
}

export function UserExists(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserExists,
        });
    };
}