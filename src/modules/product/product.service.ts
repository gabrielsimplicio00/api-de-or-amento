import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {

  async getProducts(): Promise<object> {
    const fetchProducts = await fetch('https://mockend.com/juunegreiros/BE-test-api/products')
    const products = await fetchProducts.json()
    return products
  }
}