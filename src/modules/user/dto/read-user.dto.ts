import { IsInt } from "class-validator";
import { IsNotEmpty, IsString, Max, Min } from "class-validator/types/decorator/decorators";

export class ReadUserDto {

  @IsInt()
  @Min(1)
  id: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsInt()
  @Min(10)
  @Max(200)
  tax: number
}