import { Injectable } from '@nestjs/common';
import data from '../.mockend.json'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // async getUsers(): Promise<any> {
  //   const users = fetch('https://mockend.com/juunegreiros/BE-test-api/users').then((response) => response.json)
  //   return users
  // }
}
