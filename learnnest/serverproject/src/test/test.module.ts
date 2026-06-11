import { Module, Global } from '@nestjs/common';
import { TestController } from './test.controller';

export type TestServiceConfig = { name: string };
const testConfig = { name: '--我是全局导入的 module (test module)' };

@Global()
@Module({
  controllers: [TestController],
  providers: [
    // 注入配置
    {
      provide: 'testServiceConfig',
      useValue: testConfig,
    },
  ],
  exports: ['testServiceConfig'],
})
export class TestModule {}
