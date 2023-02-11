
# API de orçamento

Projeto de middleware feito com o propósito de teste, que busca dados referente a usuários e produtos a partir de uma simulação de banco de dados


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

### Retorna um usuário específico baseado no ID

#### O Endpoint pode ser acessado de duas formas:

Somente informando o ID

```http
  GET /users/:id
```

Nesse caso, será retornado os dados do usuário que corresponde ao ID e, logo abaixo, uma mensagem informando que ao menos 1 produto deverá ser escolhido no endpoint

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer |

#### Ou informando o ID, e em seguida a query string products, seguido de uma lista de IDs do produto

A lista pode ser escrita de duas formas:

```http
  GET /users/:id?products=[1,2,3]
```

Ou

```http
  GET /users/:id?products=1,2,3
```

Ambos os casos irão retornar os produtos de ID 1, 2, 3, e o orçamento total dos produtos somados (de acordo com a porcentagem de taxa, que é específica de cada usuário), logo abaixo das informações do usuário

### Retorna todos os produtos

```http
  GET /products
```


## Rodando os testes

Para rodar os testes, escreva o seguinte comando

```bash
  npm run test
```


## Stack utilizada

**Back-end:** Node.JS, NestJS


## Referência

 - [Documentação do NestJS](https://docs.nestjs.com/)

