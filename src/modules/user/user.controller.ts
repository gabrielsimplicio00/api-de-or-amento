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
    try {
      return this.userService.getUsers();
    } catch (error) {
      throw new Error(error)
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: number, @Query('products') listaProdutos?: string): Promise<object | MainDto> {
    try {
      //A query string é opcional afim de tratar o erro de não enviá-la de forma mais amigável, sem status code 500
      if (!listaProdutos) return this.userService.getUser(id)
      return this.userService.getUser(id, listaProdutos)
    } catch (error) {
      throw new Error(error)
    }
  }
}
