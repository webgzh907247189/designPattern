// https://juejin.im/post/5f01ddfee51d4534c36d8914

/**
 * base64所以每 6 个比特为一个单元，对应某个可打印字符。
 * 3 个字节有 24 个比特，对应于 4 个 base64 单元，即 3 个字节可由 4 个可打印字符来表示
 * 一个字节8个比特
 */


 /**
  * 在 JavaScript 中，有两个函数被分别用来处理解码和编码 base64 字符串：
  * btoa()：该函数能够基于二进制数据 “字符串” 创建一个 base64 编码的 ASCII 字符串。
  * atob()： 该函数能够解码通过 base64 编码的字符串数据。
  * 
  */


// 其中的 a 代表 ASCII，而 b 代表 Blob，即二进制。因此 atob 表示 ASCII 到二进制，对应的是解码操作。
// btoa 表示二进制到 ASCII，对应的是编码操作
{
    const name = 'Semlinker';
    const encodedName = btoa(name);
    console.log(encodedName); // U2VtbGlua2Vy
}

{
    const encodedName = 'U2VtbGlua2Vy';
    const name = atob(encodedName);
    console.log(name); // Semlinker
}


