import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from '../../../entity';

@ValidatorConstraint({ async: true })
export class UserExistsConstraint implements ValidatorConstraintInterface {

    async validate(id: string) {
        try {
            const user = await User.findOne({
                where: {
                    id
                }
            });

            if (!user) return false;
            return true;
        } catch (e) {
            throw (e);
        }
    }

}

export function UserExists(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UserExists
        });
    };
}