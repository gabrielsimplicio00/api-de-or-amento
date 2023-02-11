import { IsInt, IsString, Length, Max, Min } from "class-validator";

export class ReadProductsDto {

  @IsInt()
  @Min(1)
  id: number

  @IsString()
  @Length( 5, 150)
  name: string

  @IsInt()
  @Min(1)
  @Max(15000)
  price: number
}