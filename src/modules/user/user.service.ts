import { Injectable } from '@nestjs/common';
import { MainDto } from 'src/main.dto';
import { ProductsUserDto } from './dto/products-user.dto';
import { ReadUserProductsDto } from './dto/read-user-products.dto';
import { ReadUserDto } from './dto/read-user.dto';

@Injectable()
export class UserService {
  async getUsers(): Promise<ReadUserDto[]> {
    try {
      const users = await (await fetch('https://mockend.com/juunegreiros/BE-test-api/users')).json()
      return users;
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUser(id: number, produtosId: string = null): Promise<object | MainDto> {
    const regexID = /^\d+$/
    const regexQuery = /\d+/g
    
    if(!regexID.test(String(id))) return {erro: 'ID inválido, digite somente números'}

    try {
      const users = await (await fetch('https://mockend.com/juunegreiros/BE-test-api/users')).json()
      
      if(id > users.length) return {erro: `O usuário de ID ${id} não existe `}
      
      let listaProdutosId: string[]; 
      const user = users.find(user => user.id == id)
      const tax = user.tax
      let userProducts: object | ReadUserProductsDto;

      if(produtosId){
        listaProdutosId = produtosId.match(regexQuery)
        userProducts = await this.getUserProducts(tax, listaProdutosId)
      }
      if(!produtosId) {
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
    try {
      const productsFetch = await (await fetch('https://mockend.com/juunegreiros/BE-test-api/products')).json()
      const products: ProductsUserDto[] = [];
      let orcamentoTotal = 0;
      
      if(listaProdutosId.length > 0) {
        const wrongId = listaProdutosId.filter(product => !productsFetch.find(item => item.id == product))
        if (wrongId.length > 0) {
          return {erro: ` Não existe produto(s) com o(s) ID(s) ${wrongId}`}
        }
      }
      
        for(let i = 0; i < listaProdutosId.length; i++){
          const index = Number(listaProdutosId[i]) - 1
          const valorCorrigido = parseFloat(((userTax/100) * productsFetch[index].price).toFixed(2))
          orcamentoTotal += valorCorrigido
          products.push({
            ...productsFetch[index],
            valorCorrigido
          })
        }

      orcamentoTotal = parseFloat(orcamentoTotal.toFixed(2))

      return {
        orcamentoTotal,
        products
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
