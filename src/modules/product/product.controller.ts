import { Controller, Get } from "@nestjs/common/decorators";
import { ReadProductsDto } from "./dto/read-products.dto";
import { ProductService } from "./product.service";

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async getProducts(): Promise<object | ReadProductsDto[]> {
    try { //chama o método no service de produtos para lidar com a requisição
      return this.productService.getProducts()
    } catch (error) {
      throw new Error(error)
    }
  }
}