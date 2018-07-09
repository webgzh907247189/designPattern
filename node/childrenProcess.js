let child_process = require('child_process');

{
	let grep = child_process.exec('node ./test.js',function(error, stdout, stderr){
		console.log('1231231')
	})	

	console.log(grep.pid,'子进程的进程标识')
	grep.on('exit', (code, signal) => {
		console.log(`子进程收到信号 ${signal} 而终止`);
	});

	setTimeout(() => {
		grep.kill();
		
		// process.kill(grep.pid);
	},6000)
}
