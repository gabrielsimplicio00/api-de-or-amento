import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUsers(): Promise<Array<object>> {
    const fetchUsers = await fetch('https://mockend.com/juunegreiros/BE-test-api/users')
    const users = await fetchUsers.json()
    return users;
  }

  async getUser(id: number): Promise<object> {
    const fetchUsers = await fetch('https://mockend.com/juunegreiros/BE-test-api/users')
    const users = await fetchUsers.json()
    const user = users.filter((user) => user.id == id)
    return user
  }
}
