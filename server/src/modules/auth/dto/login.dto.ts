import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
