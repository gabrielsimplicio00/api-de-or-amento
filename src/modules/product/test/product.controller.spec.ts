import { ReadProductsDto } from "../dto/read-products.dto"
import { ProductController } from "../product.controller"
import { ProductService } from "../product.service"

describe('ProductController test suite', () => {
  let productController: ProductController
  let productService: ProductService

  beforeEach(() => {
    productService = new ProductService();
    productController = new ProductController(productService);
  });

  describe('get /products', () => {
    it('should return an array of products', async () => {
      const result: ReadProductsDto[] = [{
        id: 1,
        name: "string",
        price: 100
      },
      {
        id: 2,
        name: "string",
        price: 100
      }]
      jest.spyOn(productService, 'getProducts').mockImplementation(async () => result)

      expect(await productController.getProducts()).toBe(result)
    })
  })
})