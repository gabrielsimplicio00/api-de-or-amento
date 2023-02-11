import { IsObject } from "class-validator";
import { ReadUserProductsDto } from "./modules/user/dto/read-user-products.dto";
import { ReadUserDto } from "./modules/user/dto/read-user.dto";

export class MainDto {

  @IsObject()
  user: ReadUserDto

  @IsObject()
  userProducts: ReadUserProductsDto

}