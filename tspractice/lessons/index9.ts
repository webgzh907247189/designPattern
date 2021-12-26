export {}


// 要想在外面拿到，需要 导出到外面去
// 同一个 命名空间 下进行合并了
namespace Box{
    export let name = '11'
}


namespace Box{
    export let sex = '11'
}

Box.name
Box.sex



// 要想在外面拿到，需要 导出到外面去
module Table1 {
    export namespace Test{
        export const name = '11'
    }
}
Table1.Test.name