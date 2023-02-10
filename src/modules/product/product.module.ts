import { Module } from "@nestjs/common/decorators";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule{}
