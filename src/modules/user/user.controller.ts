import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  async getUsers(): Promise<any> {
    return this.userService.getUsers();
  }

  @Get('/users/:id')
  async getUser(@Param('id') id: number): Promise<object> {
    return this.userService.getUser(id)
  }
}
