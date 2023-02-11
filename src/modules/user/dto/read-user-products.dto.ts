import { IsArray, IsNumber } from "class-validator";
import { ProductsUserDto } from "./products-user.dto";

export class ReadUserProductsDto {

  @IsNumber()
  orcamentoTotal: number

  @IsArray({
    each: true,
  })
  products: ProductsUserDto[]
}