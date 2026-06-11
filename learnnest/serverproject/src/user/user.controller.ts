import { Controller, Get, Inject, Param, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import type { UserConfig } from './user.module';
// import { TestService } from 'src/test/test.service';
import type { TestServiceConfig } from 'src/test/test.module';

@Controller('user')
export class UserController {
  // private readonly userService: UserService) // 默认注入这样写就行
  constructor(
    @Inject('customService1') private readonly userService: UserService,
    @Inject('customService2') private readonly customService2: UserConfig,
    @Inject('customService3') private readonly customService3: string,
    @Inject('testServiceConfig')
    private readonly testServiceConfig: TestServiceConfig,
  ) {}
  @Get()
  getUserList(@Request() req, @Query() query) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(req.url, query, this.customService2); // /user?a=1  { a: '1' } }  { name: '111', timeout: 4000 }
    // 这里的 this.customService2 通过自定义注入进来的
    // 这里的 this.customService2 通过自定义注入进来的
    // 这里的 this.customService2 通过自定义注入进来的

    return {
      message:
        this.customService2.name +
        this.customService3 +
        this.testServiceConfig.name,
      data: this.userService.getUserList(),
    };
  }

  @Get(':id') // path ---> http://localhost:4000  /user/2  { id: '2' }
  getUserOne(@Request() req, @Param() param) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(req.url, param);
    return { message: '查询列表', data: this.userService.getUserOne() };
  }
}
