import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import type { UserConfig } from './user/user.module';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('customService2') private readonly customService2: UserConfig,
    @Inject('customService3') private readonly customService3: string,
  ) {}

  @Get()
  getHello(): string {
    return (
      this.appService.getHello() +
      this.customService2.name +
      this.customService3
    );
  }
}
