import { IsNotEmpty, Validate, IsNumberString } from 'class-validator';
import { ValidTaskId } from 'src/customer_validation/valid_task_id.rule copy';

export class DeleteTaskDto {
  @IsNotEmpty()
  @IsNumberString()
  @Validate(ValidTaskId)
  id: number;
}
