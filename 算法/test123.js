const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://api.example.com',
    headers: {
        name: 'test',
        'X-Custom-Header': 'foobar'
    }
});
console.log(instance.defaults.headers);


instance.defaults.headers.name = 'shuxin';

console.log(instance.defaults.headers);









let crypto = require('crypto')
let SHA256 = require("crypto-js/sha256");
{
    var appkey = "631cfef8c2b9f52da70e8e1b5064791f";
    var xtransactionid = "345242352534";
    var xcustomerid = null;
    var bodyString = `{"ccCustomerIds":["7eb53db555674115af539cc9eceea821"],"wxMiniType":"MINIAPP"}`;
    var appSecret = "fc0b80363dcd3b9d728adb959ef4ec4d";
    //签名
    var content = appkey + xtransactionid + bodyString + appSecret;

    // 第一种方式计算hash
    console.log(SHA256(content).toString())
    // 536128562a07bfbcb096dbaa895f1afca887a59163b2154405e70d935d8bec7e


    // 第二种方式计算hash
    const hash = crypto.createHash('sha256');
    hash.update(content);
    console.log(hash.digest('hex'));
    //536128562a07bfbcb096dbaa895f1afca887a59163b2154405e70d935d8bec7e

    // console.log(sign)
    // sign = a8b438159c2e44e268e7b70d0641d11cba5a8b4651a905913da4f21b65b155bb
}
