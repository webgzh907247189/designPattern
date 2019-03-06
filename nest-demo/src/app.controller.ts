import { Controller, Get, Res, Req, Param, All, HttpCode, Header, Query, Body, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * 控制器的目的是接收应用的特定请求。路由机制控制哪个控制器接收哪些请求。通常，每个控制器有多个路由，不同的路由可以执行不同的操作。
 */
@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get() 修饰符告诉 Nest 创建此路由路径的端点，并将每个相应的请求映射到此处理程序。
  // 当返回 JavaScript 对象或数组时, 它会自动转换为 JSON。当我们返回字符串, Nest 将只发送一个字符串而不尝试解析它。
  @Get('a')
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('b')
  // 处理程序层添加@HttpCode（...） 装饰器来轻松更改此行为。
  @HttpCode(201) 
  @Header('Cache-Control', 'none')
  getJson(): Object {
    return {name: 'test'};
  }


  @Get('c')
  // 要指定自定义响应头，可以使用 @header() 修饰器或类库特有的响应对象
  // @Header('Cache-Control', 'none')
  getJsonC(@Res() res): void {
    res.status(HttpStatus.CREATED).json({name: `res 测试`});
  }


  // 类库特有 方式
  @Get('httpStatus')
  findHttpStatus(@Res() res) {
    res.status(HttpStatus.CREATED).json( ['111', '22'] );
  }


  // 路由通配符
  // 端点装饰器- @Put() 、 @Delete()、 @Patch()、 @Options()、 @Head()和 @All()。这些表示各自的HTTP请求方法
  @All('*query')
  getQuery(@Query() query): Object {
    console.log(query,'query')
    return {name: 'testC'};
  }

  
  @Get(':id')
  findOne(@Param() params) {
  
  //为了获取特定的参数，只需在括号中传入其参数名
  // findOne(@Param('id') id) {
    return `路由参数 -> ${params.id}`;
  }
  

  // 每个异步函数都必须返回 Promise。这意味着您可以返回延迟值, 而 Nest 将自行解析它。
  @Get()
  async findAll(): Promise<any[]> {
    return ['nest', 'test'];
  }
  

  // 此外, Nest 路由处理程序更强大。它可以返回一个 Rxjs observable 流，Nest 将自动订阅下面的源并获取最后发出的值（在流完成后）
  // @Get('findAllObservable')
  // findObservable(): Observable<any[]> {
  //   return of([]);
  // }


  // 请求负载


}
