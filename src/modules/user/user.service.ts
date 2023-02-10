import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUsers(): Promise<Array<object>> {
    try {
      const fetchUsers = await fetch('https://mockend.com/juunegreiros/BE-test-api/users')
      const users = await fetchUsers.json()
      return users;
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUser(id: number): Promise<object> {
    try {
      if(!/^\d+$/.test(String(id))) return {erro: 'ID inválido, digite somente números'}

      const users = await (await fetch('https://mockend.com/juunegreiros/BE-test-api/users')).json()

      if(id > users.length) return {erro: `O usuário de ID ${id} não existe `}

      const user = users.filter((user) => user.id == id)
      const tax = user[0].tax
      const userProducts = await this.getUserProducts(tax)

      return {
        user: user,
        products: userProducts
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUserProducts(userTax: number): Promise<object> {
    try {
      const products: object[] = [];
      const productsFetch = await (await fetch('https://mockend.com/juunegreiros/BE-test-api/products')).json()
      let orcamentoTotal = 0;
      
      for(let i = 0; i <= 4; i++){
        const randomIndex = Math.floor(Math.random() * (99 - 0) + 0);
        const valorCorrigido = parseFloat(((userTax/100) * productsFetch[randomIndex].price).toFixed(2))
        orcamentoTotal += valorCorrigido
        products.push({
          ...productsFetch[randomIndex],
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
