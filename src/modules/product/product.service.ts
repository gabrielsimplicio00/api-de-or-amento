import { Injectable } from "@nestjs/common";
import { ReadProductsDto } from "./dto/read-products.dto";

@Injectable()
export class ProductService {

  async getProducts(): Promise<object | ReadProductsDto[]> {
    const fetchProducts = await fetch('https://mockend.com/juunegreiros/BE-test-api/products')
    const products = await fetchProducts.json()
    return products
  }
}