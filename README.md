
# API de orçamento

Projeto de middleware feito com o propósito de teste, que busca dados referente a usuários e produtos a partir de uma simulação de back-end
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/gabrielsimplicio00/api-de-orcamento
```

Entre no diretório do projeto

```bash
  cd api-de-orcamento
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor de forma estática

```bash
  npm run start
```

Ou inicie um servidor que atualiza dinamicamente a cada mudança de código

```bash
  npm run start:dev
```

## Documentação da API

Caso esteja rodando o projeto em seu computador, a URL padrão de acesso é:

```http
  http://localhost:3000
```

## Rotas existentes

### Retorna todos os usuários

```http
  GET /users
```

### Retorna todos os produtos

```http
  GET /products
```

### Retorna um usuário específico baseado no ID, e os produtos correspondentes a ele

#### O Endpoint pode ser acessado de duas formas:

Informando o ID, a rota calculaProdutos e em seguida a query string produtosId, seguido de uma lista de IDs do produto     
#

Que pode ser escrita de duas formas:

```http
  GET /users/:id/calculaProdutos?produtosId=[1,2,3]
```

Ou

```http
  GET /users/:id/calculaProdutos?produtosId=1,2,3
```

Ambos os casos irão retornar os produtos de ID 1, 2, 3, e o orçamento total dos produtos somados (de acordo com a porcentagem de taxa, que é específica de cada usuário), logo abaixo das informações do usuário

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer |

| Query   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `produtosId`      | `string` | **Desejável**. Os IDs dos produtos que você quer |


## Rodando os testes

Para rodar os testes, escreva o seguinte comando:

```bash
  npm run test
```

Os testes específicos de cada módulo se encontram dentro de suas respectivas pastas:

```bash
  # pasta de testes do produto
  src/modules/product/test

  # pasta de testes do usuário
  src/modules/user/test
```


## Stack utilizada

**Back-end:** Node.JS, NestJS


## Referência

 - [Documentação do NestJS](https://docs.nestjs.com/)

