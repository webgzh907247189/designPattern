import "reflect-metadata";
function getString(arr: Object[]): string{
    Reflect.apply(JSON.stringify,null,arr)
    return JSON.stringify(arr)
}
getString([{name: 'sadsad'}])