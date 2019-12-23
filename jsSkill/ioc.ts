
// IOC & DI 控制反转与依赖注入

// 可以看到我们要实现的核心功能有三个：

// 根据提供的类创建 IoC 容器并且能够管理类之间的依赖关系
// 在通过 IoC 容器获取类的实例对象时注入相关的依赖对象
// 实现多级依赖与处理边缘情况

import { expect } from 'chai'
import { Injectable, createInjector } from './injection'

class Engine {}

class DashboardSoftware {}

@Injectable()
class Dashboard {
  constructor(public software: DashboardSoftware) {}
}

@Injectable()
class Car {
  constructor(public engine: Engine) {}
}

@Injectable()
class CarWithDashboard {
  constructor(public engine: Engine, public dashboard: Dashboard) {}
}

class NoAnnotations {
  constructor(_secretDependency: any) {}
}

describe('injector', () => {
  it('should instantiate a class without dependencies', () => {
    const injector = createInjector([Engine])
    const engine = injector.get(Engine)
    expect(engine instanceof Engine).to.be.true
  })

  it('should resolve dependencies based on type information', () => {
    const injector = createInjector([Engine, Car])
    const car = injector.get(Car)
    expect(car instanceof Car).to.be.true
    expect(car.engine instanceof Engine).to.be.true
  })

  it('should resolve nested dependencies based on type information', () => {
    const injector = createInjector([CarWithDashboard, Engine, Dashboard, DashboardSoftware])
    const _CarWithDashboard = injector.get(CarWithDashboard)
    expect(_CarWithDashboard.dashboard.software instanceof DashboardSoftware).to.be.true
  })

  it('should cache instances', () => {
    const injector = createInjector([Engine])
    const e1 = injector.get(Engine)
    const e2 = injector.get(Engine)
    expect(e1).to.equal(e2)
  })

  it('should show the full path when no provider', () => {
    const injector = createInjector([CarWithDashboard, Engine, Dashboard])
    expect(() => injector.get(CarWithDashboard)).to.throw('No provider for DashboardSoftware!')
  })

  it('should throw when no type', () => {
    expect(() => createInjector([NoAnnotations])).to.throw(
      'Make sure that NoAnnotations is decorated with Injectable.'
    )
  })

  it('should throw when no provider defined', () => {
    const injector = createInjector([])
    expect(() => injector.get('NonExisting')).to.throw('No provider for NonExisting!')
  })
})




export const Injectable = (): ClassDecorator => target => {
    Reflect.defineMetadata('Injectable', true, target)
}



abstract class ReflectiveInjector implements Injector {
    abstract get(token: any): any
    static resolve(providers: Provider[]): ResolvedReflectiveProvider[] {
      return providers.map(resolveReflectiveProvider)
    }
    static fromResolvedProviders(providers: ResolvedReflectiveProvider[]): ReflectiveInjector {
      return new ReflectiveInjector_(providers)
    }
    static resolveAndCreate(providers: Provider[]): ReflectiveInjector {
      const resolvedReflectiveProviders = ReflectiveInjector.resolve(providers)
      return ReflectiveInjector.fromResolvedProviders(resolvedReflectiveProviders)
    }
  }
  
  class ReflectiveInjector_ implements ReflectiveInjector {
    _providers: ResolvedReflectiveProvider[]
    keyIds: number[]
    objs: any[]
    constructor(_providers: ResolvedReflectiveProvider[]) {
      this._providers = _providers
  
      const len = _providers.length
  
      this.keyIds = new Array(len)
      this.objs = new Array(len)
  
      for (let i = 0; i < len; i++) {
        this.keyIds[i] = _providers[i].key.id
        this.objs[i] = undefined
      }
    }
    // ...
  }
  
  function resolveReflectiveProvider(provider: Provider): ResolvedReflectiveProvider {
    return new ResolvedReflectiveProvider_(
      ReflectiveKey.get(provider),
      resolveReflectiveFactory(provider)
    )
  }
  
  function resolveReflectiveFactory(provider: Provider): ResolvedReflectiveFactory {
    let factoryFn: Function
    let resolvedDeps: ReflectiveDependency[]
  
    factoryFn = factory(provider)
    resolvedDeps = dependenciesFor(provider)
  
    return new ResolvedReflectiveFactory(factoryFn, resolvedDeps)
  }
  
  function factory<T>(t: Type<T>): (args: any[]) => T {
    return (...args: any[]) => new t(...args)
  }
  
  function dependenciesFor(type: Type<any>): ReflectiveDependency[] {
    const params = parameters(type)
    return params.map(extractToken)
  }
  
  function parameters(type: Type<any>) {
    if (noCtor(type)) return []
  
    const isInjectable = Reflect.getMetadata('Injectable', type)
    const res = Reflect.getMetadata('design:paramtypes', type)
  
    if (!isInjectable) throw noAnnotationError(type)
  
    return res ? res : []
  }
  
  export const createInjector = (providers: Provider[]): ReflectiveInjector_ => {
    return ReflectiveInjector.resolveAndCreate(providers) as ReflectiveInjector_
  }



  class ReflectiveInjector_ implements ReflectiveInjector {
    // ...
    get(token: any): any {
      return this._getByKey(ReflectiveKey.get(token))
    }
    private _getByKey(key: ReflectiveKey, isDeps?: boolean) {
      for (let i = 0; i < this.keyIds.length; i++) {
        if (this.keyIds[i] === key.id) {
          if (this.objs[i] === undefined) {
            this.objs[i] = this._new(this._providers[i])
          }
          return this.objs[i]
        }
      }
  
      let res = isDeps ? (key.token as Type).name : key.token
  
      throw noProviderError(res)
    }
    _new(provider: ResolvedReflectiveProvider) {
      const resolvedReflectiveFactory = provider.resolvedFactory
      const factory = resolvedReflectiveFactory.factory
  
      let deps = resolvedReflectiveFactory.dependencies.map(dep => this._getByKey(dep.key, true))
  
      return factory(...deps)
    }
  }
  


  let res = isDeps ? (key.token as Type).name : key.token

throw noProviderError(res)
if (!isInjectable) throw noAnnotationError(type)