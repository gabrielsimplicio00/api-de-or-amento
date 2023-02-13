import { Controller, Get, Param } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { MainDto } from 'src/main.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getUsers(): Promise<ReadUserDto[]> {
    try { //chama o método no service de usuários para lidar com a requisição
      return this.userService.getUsers();
    } catch (error) {
      throw new Error(error)
    }
  }

  @Get(':id') // caso no endpoint só seja digitado o ID, um objeto será retornado sem as informações de produtos, apenas de usuário
  async getUser(@Param('id') id: number): Promise<object | MainDto> {
    return this.userService.getUser(id)
  }

  @Get(':id/calculaProdutos')
  async getUserAndProducts(@Param('id') id: number, @Query('produtosId') listaProdutos: string): Promise<object | MainDto> {
    try {
      if (!listaProdutos) return this.userService.getUser(id) // caso a query string não seja fornecida, o erro é tratado de forma mais amigável no service
      return this.userService.getUser(id, listaProdutos)
    } catch (error) {
      throw new Error(error)
    }
  }
}
