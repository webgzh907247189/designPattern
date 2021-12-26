export default class BaseMiddleware {
    constructor(options = {}) {
        this.middleware = options.middleware || [];
    }

    use(fn) {
        this.middleware.push(fn);
        return this;
    }
}

export class Middleware extends BaseMiddleware{
    constructor() {
        super();
        this.boolean = true;
    }

    compose() {
        const middleware = this.middleware;
        const idx = 0;
        const dispatch = index => {
            if (index >= middleware.length) {
                return true;
            }

            const itemFn = middleware[index];
            this.boolean = itemFn();
         
            return this.boolean ? dispatch(index + 1) : this.boolean;
        };

        return dispatch(idx);
    }
}

const midd = new Middleware()
midd.use(() => {
    debugger
    return true
}).use(() => {
    debugger
    return true
}).use(() => {
    debugger
    return true
})

const result = midd.compose();
console.log(result);