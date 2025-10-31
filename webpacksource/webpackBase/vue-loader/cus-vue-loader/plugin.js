const path = require('path')

class VueLoaderPlugin{
    apply(compiler){
        const rules = compiler.options.module.rules

        // 拦截老的 loader 规则，添加新的 pitch loader
        const pitcher = {
            loader: path.resolve(__dirname, "./pitch.js"),
            // 满足 (parse.get('vue') !== null) 条件进入到当前 pitch loader
            resourceQuery: (query) => {
                // console.log(query, 'query')
                if(!query) return

                let parse = new URLSearchParams(query)
                return parse.get('vue') !== null
            }
        }

        const templateCompilerRule = {
            loader: path.resolve(__dirname, "./templateLoader.js"),
            // 满足 (parse.get('vue') !== null) 条件进入到 templateLoader
            resourceQuery: (query) => {
                // console.log(query, 'query')
                if(!query) return

                let parse = new URLSearchParams(query)
                return parse.get('vue') !== null && parse.get('type') === 'template'
            }
        }

        const vueRule = rules.find(rule => rule.test.test('.vue'))

        // 不 clone 编译.vue 的规则
        const cloneRulesLoader = rules.filter(rule => rule !== vueRule).map((rule) => cloneRules(rule))

        compiler.options.module.rules = [pitcher, templateCompilerRule, ...cloneRulesLoader, ...rules]
    }
}

module.exports = VueLoaderPlugin;

const cloneRules = (rule) => {
    let currentResource;
    const result = Object.assign(Object.assign({}, rule), {
        // 优先匹配 resource
        // 后面在匹配 resourceQuery
        resource: (resource) => {
            // resource ----> /Users/web/Documents/github/designPattern/webpacksource/webpackBase/vue-loader/src/App.vue
            currentResource = resource
            return true;
        },
        resourceQuery: (query) => {
            if(!query) return false

            let parse = new URLSearchParams(query.slice(1))

            if(parse.get('vue') == null) return false

            // parse ----> { type: 'style'; lang: 'css' }
            const fakeResourcePath = ruleResource(parse, currentResource)

            // fakeResourcePath ---> /Users/web/Documents/github/designPattern/webpacksource/webpackBase/vue-loader/src/App.vue.css
            if(!fakeResourcePath.match(rule.test)) return false
            return true
        }
    })    
    delete result.test
    return result
}

const ruleResource = (query, resource) => {
    return `${resource}.${query.get('lang')}`
}