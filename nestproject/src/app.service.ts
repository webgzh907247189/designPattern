
import { Inject, Injectable } from "@nestjs/common";
import { FactoryService, LoggerService, ValService, StringService } from "./logger.service";

// 一个类 需要注册参数，使用 Injectable
// 可被注入 别的服务
@Injectable()
export class AppService{
    constructor(
        private loggerService: LoggerService, 
        private valService: ValService, 
        private factoryService: FactoryService, 
        @Inject('StringToken') private stringService: StringService
    ){

    }
    getHello(){
        this.loggerService.log('hello')
        this.valService.log('valService')
        this.factoryService.log('factoryService')
        this.stringService.log('stringService')

        return 'hello'
    }
}