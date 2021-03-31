import { IsString, IsIn, IsNumberString, IsNotEmpty } from "class-validator";

export class WithdrawDto{
  @IsNotEmpty()
  @IsIn(["litecoin", "bitcoin"])
  network: string;

  @IsNotEmpty()
  @IsNumberString()
  amount: string

  @IsNotEmpty()
  @IsString()
  withdrawAddress: string
}