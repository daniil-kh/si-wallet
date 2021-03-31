import { IsAlpha, IsNotEmpty } from "class-validator";

export class FullNameDto {
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsNotEmpty()
  @IsAlpha()
  surname: string;
}