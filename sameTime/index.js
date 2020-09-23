/**
 * 考虑到时区到比较
 * 
 * toISOString 使用 ISO 方法 把 data 转为 string
 * 
 * getTimezoneOffset 拿到 距离 GMT 的差别分钟数
 */
function sameTime(dateA, dateB){
    const dateADate = new Date(dateA);
    const dateBDate = new Date(dateB);
    return getLocalISODate(dateADate) === getLocalISODate(dateBDate)
}

function getLocalISODate(date){
    const getTimezoneOffset = date.getTimezoneOffset() * 60 * 1000;
    const localTime = date.getTime() - getTimezoneOffset;
    return new Date(localTime).toISOString();
}

const test1 = '2020-09-23T07:05:11.000Z';
const test2 = 'Wed Sep 23 2020 15:05:11 GMT+0800 (中国标准时间)';
const test3 = 'Wed Sep 23 2020 15:06:11 GMT+0800 (中国标准时间)';
console.log(sameTime(test1, test2))
console.log(sameTime(test1, test3))