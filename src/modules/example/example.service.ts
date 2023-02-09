import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  example(): string {
    return 'example';
  }
}
