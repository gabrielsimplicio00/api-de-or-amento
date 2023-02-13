import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  routes(): object {
    return {
      listarUsuarios: "localhost:3000/users",
      listarProdutos: "localhost:3000/products",
      listarUsuarioEProdutosPeloId: "localhost:3000/users/:id/calculaProdutos?produtosId=1,2,3",
    }
  }
}