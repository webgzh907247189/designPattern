// $i('dayjs')
const allData = [...document.getElementsByTagName('tmp')].reduce((result, item) => {
    const val = dayjs('2021-07-12 ' + (item.textContent.replace(/\n/g,'').trim()).padStart(8, '00:') ).unix()

    // 得到从 0点 开始点 unix 时间差
    const aa = val - dayjs('2021-07-12 00:00:00').unix()
    if(!Number.isNaN(val)){
        result += aa;

        let s= dayjs('2021-07-12 00:00:00').unix() + aa;
        console.log(dayjs(s * 1000).format('YYYY-MM-DD HH:mm:ss'));
    }
    
    return result
},0)


let time = dayjs('2021-07-12 00:00:00').unix() + allData;
console.log(dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss'));