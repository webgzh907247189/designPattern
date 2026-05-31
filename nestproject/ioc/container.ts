import { InjectToken, isClassProvider, isFactoryProvider, isValueProvider, Provider, Token, ValueProvider, FactoryProvider, ClassProvider } from './provider'

export class Container{
    private providers = new Map<Token<any>, Provider<any>>()
    addProvider<T>(provider: Provider<T>){

        // provide 就是 token 或者 标识符
        this.providers.set(provider.provide, provider)
    }
    inject(token: Token<any>){
        // 类型强制转换
        // let provider: Provider<any> = <ValueProvider<any>>this.providers.get(token)
        // return provider.useValue

        let provider = this.providers.get(token)
        return this.injectWithProvider(token, provider)
    }
    getToken<T>(token: Token<T>){
        return token instanceof InjectToken ? token.injectionIdentifier : token.name // token.name 代表 类的 名字
    }
    injectWithProvider(token: Token<any>, provider: Provider<any>){
        if(provider === undefined){
            throw new Error(`No provider for type ${this.getToken(token)}`)
        }

        else if(isClassProvider(provider)){
            return this.injectClass(provider)
        }else if(isValueProvider(provider)){
            return this.injectValue(provider)
        }else if(isFactoryProvider(provider)){
            return this.injectFactory(provider)
        }else{
            throw new Error(`provider is not supported`)
        }
    }

    injectValue<T>(provider: ValueProvider<T>): T{
        return provider.useValue
    }
    injectFactory<T>(provider: FactoryProvider<T>): T{
        return provider.useFactory()
    }
    injectClass<T>(provider: ClassProvider<T>): T{
        let target = provider.useClass
        let params = []
        
        return Reflect.construct(target, params)
        // 上下两个写法一样
        // return new provider.useClass()
    }
}