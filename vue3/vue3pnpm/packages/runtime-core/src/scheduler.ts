
const queue = []
let isFlushing = false

const p = Promise.resolve()
export function queueJobs(job){
    if(!queue.includes(job)){
        queue.push(job)
    }

    if(!isFlushing){
        isFlushing = true;
        p.then(()=>{
            isFlushing = false;

            // 把当前队列的job 拷贝一份
            let copyQueue = queue.slice(0)
            queue.length = 0;


            // let job;
            // while(job = queue.shift()){
            //     job.run();
            // }
            copyQueue.forEach(job=>job())
            copyQueue.length = 0;
        })

    }
}