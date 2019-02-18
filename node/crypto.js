const crypto = require('crypto')
const queryString = require('querystring');

let cookie = "_ga=GA1.2.370496175.1512711491; PHPSESSID=web2~q8u988rtuf92dqt7g08rhlhdpv; _gid=GA1.2.1739138443.1550501906; Hm_lvt_e23800c454aa573c0ccb16b52665ac26=1550501906,1550501909,1550501910,1550501978; Hm_lpvt_e23800c454aa573c0ccb16b52665ac26=1550501978"
let obj = queryString.parse(cookie,'; ','=')
console.log(obj)
//{ 
//  _ga: 'GA1.2.370496175.1512711491',
//  PHPSESSID: 'web2~q8u988rtuf92dqt7g08rhlhdpv',
//  _gid: 'GA1.2.1739138443.1550501906',
//  Hm_lvt_e23800c454aa573c0ccb16b52665ac26: '1550501906,1550501909,1550501910,1550501978',
//  Hm_lpvt_e23800c454aa573c0ccb16b52665ac26: '1550501978' 
//}


function encrypt(data, key){
  let cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(encrypted, key){
  let decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
let key = 'bz'


/**
 * 设置cookie的方法
 * @param {*} name   设置cookie的名字
 * @param {*} value  设置cookie的名字对应的值
 * @param {*} Days   设置cookie的有效期
 */
function setCookie(name,value,Days=3) {
  let exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);

  document.cookie = `${name}=${encrypt(encodeURIComponent(value),key)};expires=${exp.toGMTString()};path=/login`;
}

/**
 * 获取cookie 转为 对象 记得要对 key做trim处理
 */
function getCookie(){
  return (document.cookie || '').split(';').reduce((result,item)=>{
    let [key='',value] = item.split('=')
    result[key.trim()] = value
    
    return result
  },{})
}

/**
 * 删除 cookie方法
 */
function deleteCookie(name,value=''){
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  document.cookie = `${name}=${decodeURIComponent(encrypt(value,key))};expires=${exp.toGMTString()};path=/login`;
}

export {setCookie, getCookie, deleteCookie, decrypt, key}