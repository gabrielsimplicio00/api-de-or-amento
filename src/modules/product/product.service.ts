import { Injectable } from "@nestjs/common";
import { ReadProductsDto } from "./dto/read-products.dto";

@Injectable()
export class ProductService {
  // busca todos os produtos no mockend e retorna um array nos moldes de ReadProductsDto, pra deixar o modelo do objeto padronizado
  async getProducts(): Promise<object | ReadProductsDto[]> {
    try {
      const products = await (await fetch('https://mockend.com/juunegreiros/BE-test-api/products')).json()
      return products
    } catch (error) {
      throw new Error(error)
    }
  }
}