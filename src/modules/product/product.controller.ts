import { Controller, Get } from "@nestjs/common/decorators";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService){}

  @Get()
  async getProducts(): Promise<object> {
    return this.productService.getProducts()
  }
}