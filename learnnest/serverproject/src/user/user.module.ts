import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ArticleService } from '../article/article.service';

export type UserConfig = {
  name: string;
  timeout: number;
};

const userConfig = {
  name: '--- 查询测试(当前字符串 是自定义 customService2 注入进来的)',
  timeout: 4000,
};

@Module({
  controllers: [UserController],
  providers: [
    /** 服务中 注入 服务, 首先把 需要注入的服务 放到全局中去 注册 **/
    ArticleService,
    /** 服务中 注入 服务, 首先把 需要注入的服务 放到全局中去 注册 **/

    // 默认注入
    // UserService

    // 自定义注入方式
    {
      provide: 'customService1',
      useClass: UserService,
    },

    // 注入配置
    {
      provide: 'customService2',
      useValue: userConfig,
    },

    /** 服务中 注入 服务, 需要依赖上面的服务放入到容器中 **/
    /** 服务中 注入 服务, 需要依赖上面的服务放入到容器中 **/
    {
      provide: 'customService3',
      inject: [ArticleService],
      useFactory(articleService: ArticleService) {
        return articleService.getArticleName();
      },
    },
  ],
  exports: ['customService2', 'customService3'],
})
export class UserModule {}
