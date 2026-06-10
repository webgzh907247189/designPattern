const http = require('http');
const { execSync } = require('child_process')

// 创建服务器
const server = http.createServer(async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有域名访问
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); // 允许的请求方式
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // 允许的请求头

  // 设置响应头：返回 JSON 格式
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'GET' && req.url === '/api/notication') {
    res.writeHead(200);

    await execSync('afplay /System/Library/Sounds/Ping.aiff')
    await execSync('afplay /System/Library/Sounds/Glass.aiff')
    await execSync('afplay /System/Library/Sounds/Sosumi.aiff')

    res.end(JSON.stringify({
      code: 200,
      msg: '你好，这是第一个 Node.js 接口！',
      data: 'Hello World'
    }));
    return;
  }
});

// 启动服务，监听端口 3000
server.listen(3000, () => {
  console.log('服务器启动成功：http://localhost:3000');
});