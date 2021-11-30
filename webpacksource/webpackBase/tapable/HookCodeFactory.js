class HookCodeFactory{

    setup(hookInstance, options){
        // _x 事件函数的数组
        hookInstance._x = options.taps.map(item => item.fn)
    }

    agrs({ after, before } = {}){
        let allArgs = this.options.args
        if(allArgs.length > 0){
            if(after){
                allArgs = [...allArgs, after]
            }else if(before){
                allArgs = [before, ...allArgs]
            }
            
            return allArgs.join(', ')
        }
        return ''
    }

    header(){
        let code = ''
        code += `var _x = this._x;\n`
        let interceptors = this.options.interceptors
        if(interceptors.length > 0){
            // 拦截器的 逻辑
            code += `var _taps = this.taps; \n`    
            code += `var _interceptors = this.interceptors; \n`    

            for (let index = 0; index < interceptors.length; index++) {
                const element = interceptors[index];
                if(element.call){
                    code += `_interceptors[${index}].call(${this.agrs()}) \n`
                }
            }
        }
        return code
    }   
    content(){
        throw new Error('需要子类重写')
    }

    create(options){
        this.init(options) //  taps: [{ options: { name: 'xx' }, type: 'sync' | 'async', fn }], args: 真正调用传入的参数, type: 'sync' | 'async',

        let fn;
        switch(options.type){
            case 'sync':
                fn = new Function(this.agrs(), this.header() + this.content())
                break;
            case 'async':
                fn = new Function(this.agrs({ after: '_callback' }), this.header() + this.content({ onDone: () => `return _callback();` }))
                break;
            case 'promise':
                let tapsContent = this.content({ onDone: () => `_resolve()`});
                let content = `return new Promise((_resolve, _reject) => {
                    ${tapsContent}
                })`;

                fn = new Function(this.agrs(), this.header() + content)
                break;
            default:
                break;
        }
        
        this.deinit();
        // console.log(fn.toString());
        return fn;
    }

    init(options){
        this.options = options
    }

    deinit(){
        this.options = null
    }

    callTapSeries(){
        let taps = this.options.taps
        if(taps.length === 0){
            return ''
        }

        let code = ''
        for (let index = 0; index < taps.length; index++) {
            code += this.callTapSerie(index)
        }
        return code;
    }
    callTapSerie(tapIndex){
        let code = ``

        // 拦截器的逻辑
        let interceptors = this.options.interceptors
        if(interceptors.length > 0){
            for (let index = 0; index < interceptors.length; index++) {
                const element = interceptors[index];
                if(element.tap){
                    code += `var _tap${index} = _taps[${index}]\n`
                    code += `_interceptors[${index}].tap(_tap${index}) \n`
                }
            }
        }


        code += `var _fn${tapIndex} = _x[${tapIndex}]\n`

        let tapInfo = this.options.taps[tapIndex]
        switch(tapInfo.type){
            case 'sync':
                code += `_fn${tapIndex}(${this.agrs()});\n`
                break;
            case 'async':
                code += `_fn${tapIndex}(${this.agrs({
                    after: `function(){
                        if(--_counter === 0) _done();
                    }`
                })});\n`
                break;
            case 'promise':
                code += `
                    var promise${tapIndex} = _fn${tapIndex}(${this.agrs()});\n
                    promise${tapIndex}.then(() => {
                        if(--_counter === 0) _done();
                    })
                `
                break;
            default:
                break;
        }
        return code;
    }


    callTapParalles({ onDone }){
        let taps = this.options.taps
        if(taps.length === 0){
            return ''
        }

        let code = `var _counter = ${taps.length};\n
            var _done = function(){
                ${onDone()}
            };\n
        `
        for (let index = 0; index < taps.length; index++) {
            code += this.callTapSerie(index)
        }
        return code;
    }
}

module.exports = HookCodeFactory