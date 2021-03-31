import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginFormDto {
  @IsEmail()
  readonly email: string;
  
  @IsNotEmpty()
  readonly password: string;
}