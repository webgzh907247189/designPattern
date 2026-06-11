import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleController } from './article/article.controller';
import { ArticleService } from './article/article.service';
import { ArticleModule } from './article/article.module';
import { TestService } from './test/test.service';
import { TestModule } from './test/test.module';

@Module({
  imports: [UserModule, ArticleModule, TestModule], // 导入其他人的模块 (导入别人的 module)
  controllers: [AppController, ArticleController], // 路由
  providers: [AppService, ArticleService, TestService], // 放入容器中
})
export class AppModule {}
