export default function compose(...fns) {
    return fns.reduce((a, b) => (...args) => a(b(...args)))
}