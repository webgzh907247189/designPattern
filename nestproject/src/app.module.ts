
import { Module } from "@nestjs/common"; 
import { AppControler }  from './app.controller'
import { AppService } from './app.service'
import { FactoryService, LoggerService, ValService, StringService } from './logger.service'

@Module({
    controllers: [ AppControler ],
    providers: [ 
        AppService, 
        {
            provide: LoggerService, // Token 类型
            useClass: LoggerService // 注册的是一个 类
        },
        {
            provide: ValService, // Token 类型
            useValue: new ValService() // 注册的是一个 value
        },
        {
            provide: FactoryService, // Token 类型
            useFactory: () => new FactoryService() // 注册的是一个 工厂
        },
        {
            provide: 'StringToken', // 字符串的话 需要注意，使用 inject
            useClass: StringService // 注册的是一个 类
        }
     ]
})

export class AppModule{

}