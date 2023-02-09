import { Module } from '@nestjs/common';
import { ExampleModule } from './modules/example/example.module';

@Module({
  imports: [ExampleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
