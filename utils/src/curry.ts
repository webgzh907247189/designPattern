
// type CurryType<F extends (args: infer S) => any, A> = (fn: F, args: S) => (args: S) => any


type Test = (fn: any, ...args: any[]) => any

const curry: Test = (fn, ...args) => {
    if (args.length >= fn.length) {
        return fn(...args);
    }

    return (...runArgs: any) => curry(fn, ...args, ...runArgs);
}

export default curry
