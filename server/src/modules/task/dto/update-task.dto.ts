import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { ValidTaskId } from 'src/customer_validation/valid_task_id.rule copy';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  @IsNumber()
  @Validate(ValidTaskId)
  taskId: number;
}
