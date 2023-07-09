import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { TaskStatus } from '../../../enums/task-status.enum';

export class CreateTaskDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @IsIn([TaskStatus.DONE, TaskStatus.TO_DO, TaskStatus.IN_PROGRESS])
  status: TaskStatus;
}
