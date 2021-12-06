// import userAgent from 'user-agent';
const { parse } = require('user-agent');

let host = 'cn-beijing.log.aliyun.com'
let project = 'monitor'
let logStore = 'testmonitor-store'

function getExtraData(){
    return {
        title: document.title,
        url: location.href,
        timestamp: Date.now(),
        userAgent: parse(navigator.userAgent)
    }
}

class sendTracker{
    constructor(){
        this.url = `http://${project}.${host}/logStores/${logStore}/tracker`
        this.xhr = new XMLHttpRequest();
    }

    send(data){
        let extraData = getExtraData();
        let log = { ...data, ...extraData  }

        // 阿里云要求，key 不能是数字
        for (let item in log) {
            if(typeof log[item] === 'number'){
                log[item] =  `${log[item]}` // String(log[item])
            }
        }

        console.log(log, 'send---log');
        this.xhr.open('POST', this.url, true) // 第三个参数 是否异步

        let body = JSON.stringify({
            __logs__: [log]
        })
        this.xhr.setRequestHeader('Content-Type', 'application/josn')
        this.xhr.setRequestHeader('x-log-apiversio', '0.6.0')
        this.xhr.setRequestHeader('x-log-bodyrawsize', body.length)
        
        this.xhr.onload = function(res){

        }
        this.xhr.onload = function(error){
            
        }
        this.xhr.send()
    }
}

export default new sendTracker();