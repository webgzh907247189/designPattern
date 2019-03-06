import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


/**
 * Nest 不知道 CatsController 是否存在，所以它不会创建这个类的一个实例
 * 
 * 控制器总是属于模块，这就是为什么我们将 controllers 数组保存在 @module() 装饰器中
 * 由于除了根 ApplicationModule，我们没有其他模块
 * 
 */