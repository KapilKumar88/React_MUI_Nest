import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TaskService } from '../modules/task/task.service';

@ValidatorConstraint({ name: 'validTaskId', async: true })
export class ValidTaskId implements ValidatorConstraintInterface {
  constructor(private readonly taskService: TaskService) {}

  async validate(id: string, _args: ValidationArguments) {
    try {
      const result = await this.taskService.taskExists(+id);
      if (result > 0) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Invalid task id';
  }
}
