import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class ListTaskDto {
  @IsNotEmpty()
  @IsNumberString()
  limit: string;

  @IsNotEmpty()
  @IsNumberString()
  page_num: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsOptional()
  @IsString()
  search?: string;
}
