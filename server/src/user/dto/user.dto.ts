import { IsAlpha, IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsAlpha()
  readonly name: string;

  @IsNotEmpty()
  @IsAlpha()
  readonly surname: string;

  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;
  
  @IsNotEmpty()
  password: string;
}