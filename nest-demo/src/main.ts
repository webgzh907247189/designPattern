import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // create() 方法返回一个实现 INestApplication 接口的对象, 并提供一组可用的方法, 在后面的章节中将对此进行详细描述。
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}
bootstrap();
