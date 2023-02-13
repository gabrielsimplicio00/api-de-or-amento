import { Injectable } from '@nestjs/common';
import { MainDto } from 'src/main.dto';
import { ReadProductsDto } from '../product/dto/read-products.dto';
import { ProductsUserDto } from './dto/products-user.dto';
import { ReadUserProductsDto } from './dto/read-user-products.dto';
import { ReadUserDto } from './dto/read-user.dto';

@Injectable()
export class UserService {
  async getUsers(): Promise<ReadUserDto[]> { // DTO criado para padronizar o tipo de dado que será retornado no array
    try {
      const users = await (await fetch('https://mockend.com/juunegreiros/BE-test-api/users')).json()
      return users;
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUser(id: number, produtosId = ""): Promise<object | MainDto> {
    const regexID = /^\d+$/ // expressão para verificar se existe algum símbolo ou elemento não numérico no campo ID
    const regexQuery = /\d+/g // expressão para armazenar posteriormente todos os números na lista de IDs de produto

    try {
      // tratamento de erro caso o ID fornecido possua algum símbolo ou elemento não numérico, ou não seja um número inteiro positivo
      if (!regexID.test(String(id))) return { erro: 'ID inválido, somente números inteiros e positivos são aceitos' }

      const usersMockend: ReadUserDto[] = await (await fetch('https://mockend.com/juunegreiros/BE-test-api/users')).json()

      // tratamento de erro caso o ID fornecido não exista no mockend
      if (!this.findUser(usersMockend, id)) return { erro: `O usuário de ID ${id} não existe ` }

      let listaProdutosId: number[];
      let userProducts: object | ReadUserProductsDto;

      // retorna um usuário no array fornecido pelo mockend, que possua o mesmo ID fornecido no endpoint
      const user = this.findUser(usersMockend, id)
      const tax = user.tax

      // se for fornecido algum ID de produto, listaProdutosId armazenará todos, e executará o método completo
      if (produtosId) {
        listaProdutosId = produtosId.match(regexQuery).map(idProdutos => parseInt(idProdutos))
        userProducts = await this.getUserProducts(tax, listaProdutosId)
      } else if (!produtosId) {
        // se nenhum ID de produto for fornecido o método é chamado para tratar o erro no método abaixo
        userProducts = await this.getUserProducts(tax)
      }

      return {
        user,
        userProducts
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  private async getUserProducts(userTax: number, listaProdutosId: number[] = []): Promise<object | ReadUserProductsDto> {
    if (listaProdutosId === null || listaProdutosId.length === 0) { // tratamento de erro caso não seja passado nenhum ID de produto
      return { erro: "Ao menos 1 produto deve ser escolhido para calcular o orçamento" }
    }

    try {
      const productsMockend = await (await fetch('https://mockend.com/juunegreiros/BE-test-api/products')).json()

      const products: ProductsUserDto[] = [];
      let valorTotal = 0;

      // a lista de IDs de produto é percorrida com o método filter, e a cada iteração é verificado se esse ID existe no mockend
      const wrongIds = listaProdutosId.filter(produtoId => !this.findProducts(productsMockend, produtoId))

      //caso o ID não exista, wrongIds armazena e retorna uma msg de erro com os IDs inválidos
      if (wrongIds.length > 0) {
        return { erro: ` Não existe produto com os IDs: ${wrongIds}` }
      }

      for (let i = 0; i < listaProdutosId.length; i++) {
        const index = Number(listaProdutosId[i]) - 1
        const produtoEscolhido = productsMockend[index]

        //atributo price armazena o preço do produto que foi achado no mockend
        const price = produtoEscolhido.price

        // operação para armazenar na variável o valor real que o usuário tem que pagar (baseado na sua taxa) por cada produto
        const valorCorrigido = parseFloat(((userTax / 100) * price).toFixed(2))

        // o valor é adicionado ao orçamento total, para no final retornar quanto deve ser pago por todos os produtos
        valorTotal += valorCorrigido

        products.push({
          ...produtoEscolhido,
          valorCorrigido
        })
      }

      return {
        valorTotal,
        products
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  private findUser(userArray: ReadUserDto[], id: number) {
    return userArray.find(user => user.id == id)
  }

  private findProducts(productArray: ReadProductsDto[], id: number) {
    return productArray.find(product => product.id == id)
  }
}
