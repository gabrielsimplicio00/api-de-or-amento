import { Controller, Get, Param } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { MainDto } from 'src/main.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  routes(): object {
    return {
      listarUsuarios: "localhost:3000/users",
      listarProdutos: "localhost:3000/products",
      listarUsuarioEProdutosPeloId: "localhost:3000/users/:id?products=1,2,3",
    }
  }

  @Get('/users')
  async getUsers(): Promise<ReadUserDto[]> {
    return this.userService.getUsers();
  }

  @Get('/users/:id')
  async getUser(@Param('id') id: number, @Query('products') listaProdutos?: string): Promise<object | MainDto> {
    if (listaProdutos) {
      return this.userService.getUser(id, listaProdutos)
    } else {
      return this.userService.getUser(id)
    }
  }
}
