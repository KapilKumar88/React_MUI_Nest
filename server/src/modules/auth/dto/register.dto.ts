import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  Validate,
} from 'class-validator';
import { UniqueEmailValidation } from '../../../customer_validation/unique_email_validation.rule';

export class RegisterDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Validate(UniqueEmailValidation)
  email: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsString()
  name: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
