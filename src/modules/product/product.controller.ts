import { Controller, Get } from "@nestjs/common/decorators";
import { ReadProductsDto } from "./dto/read-products.dto";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService){}

  @Get()
  async getProducts(): Promise<object | ReadProductsDto[]> {
    try {
      return this.productService.getProducts()
    } catch (error) {
      return {erro: error}
    }
  }
}