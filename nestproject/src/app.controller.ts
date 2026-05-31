import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

// controller 只负责 接收参数，返回 响应， 并不会真正处理业务
@Controller('/')
export class AppControler{
    // 有了 private 直接给 实列赋值
    // 类似于 this.appsevice = appsevice

    // 声明了依赖， ioc 容器自动 注入 实列 ， 不需要自己创建
    constructor (private appsevice: AppService) {
        
    }
    @Get('hello')
    hello(){
        const result = this.appsevice.getHello()
        return result
    }
}
