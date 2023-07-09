import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../modules/user/user.service';

@ValidatorConstraint({ name: 'uniqueEmailValidation', async: true })
export class UniqueEmailValidation implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string, _args: ValidationArguments) {
    try {
      const result = await this.userService.emailExists(email);
      if (result > 0) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Email already taken try with different one';
  }
}
