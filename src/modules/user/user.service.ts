import { Injectable } from '@nestjs/common';
import { MainDto } from 'src/main.dto';
import { ProductsUserDto } from './dto/products-user.dto';
import { ReadUserProductsDto } from './dto/read-user-products.dto';
import { ReadUserDto } from './dto/read-user.dto';

@Injectable()
export class UserService {
  // DTO criado para padronizar o tipo de dado que será retornado no array
  async getUsers(): Promise<ReadUserDto[]> {
    try {
      const users = await (await fetch('https://mockend.com/juunegreiros/BE-test-api/users')).json()
      return users;
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUser(id: number, produtosId = ""): Promise<object | MainDto> {

    // regex para verificar se existe algum símbolo ou elemento não numérico no campo ID
    const regexID = /^\d+$/

    // regex para armazenar posteriormente todos os elementos numéricos na lista fornecida pela query
    const regexQuery = /\d+/g

    try {
      const users = await (await fetch('https://mockend.com/juunegreiros/BE-test-api/users')).json()

      // tratamento de erro caso o ID fornecido possua algum símbolo ou elemento não numérico, ou não seja um numero inteiro positivo
      if (!regexID.test(String(id)) || id < 1) return { erro: 'ID inválido, somente números inteiros e positivos são aceitos' }

      if (id > users.length) return { erro: `O usuário de ID ${id} não existe ` }

      let listaProdutosId: string[];

      // retorna um usuário no array fornecido pelo mockend, que possua o mesmo ID fornecido no endpoint
      const user = users.find((user) => user.id == id)
      const tax = user.tax

      let userProducts: object | ReadUserProductsDto;

      if (produtosId) {
        // se for fornecido algum ID de produto, listaProdutosId armazena um array com todos os IDs da query, e executa o método completo
        listaProdutosId = produtosId.match(regexQuery)
        userProducts = await this.getUserProducts(tax, listaProdutosId)
      } else if (!produtosId) {
        // se nenhum ID de produto for fornecido o método é chamado para tratar o erro posteriormente
        userProducts = await this.getUserProducts(tax)
      }

      return {
        user: user,
        userProducts: userProducts
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUserProducts(userTax: number, listaProdutosId: string[] = []): Promise<object | ReadUserProductsDto> {
    // caso não seja passado nenhum ID de produto o erro é tratado aqui
    if (listaProdutosId === null || listaProdutosId.length === 0) {
      return { erro: "Ao menos 1 produto deve ser escolhido para calcular o orçamento" }
    }

    try {
      const productsFetch = await (await fetch('https://mockend.com/juunegreiros/BE-test-api/products')).json()

      const products: ProductsUserDto[] = [];
      let orcamentoTotal = 0;

      // a lista de IDs de produto é percorrida com o método filter, e a cada iteração é verificado se esse ID existe no mockend
      const wrongIds = listaProdutosId.filter(product => !productsFetch.find(item => item.id == product))

      //caso o ID não exista, wrongIds armazena e retorna uma msg de erro com os IDs inválidos
      if (wrongIds.length > 0) {
        return { erro: ` Não existe produto(s) com o(s) ID(s) ${wrongIds}` }
      }


      for (let i = 0; i < listaProdutosId.length; i++) {
        // o index é coletado através da query e utilizado para achar o elemento correspondente no array de produtos
        const index = Number(listaProdutosId[i]) - 1

        //atributo price é coletado do produto achado no mockend, e armazenado numa variável
        const price = productsFetch[index].price

        // o valorCorrigido multiplica a taxa de um usuário (%) pelo preço original do produto
        const valorCorrigido = parseFloat(((userTax / 100) * price).toFixed(2))

        // esse valor é adicionado ao orçamento total, para no final retornar quanto o usuário deve pagar por todos os produtos somados
        orcamentoTotal += valorCorrigido

        products.push({
          ...productsFetch[index],
          valorCorrigido
        })
      }

      return {
        orcamentoTotal,
        products
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
