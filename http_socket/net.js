import net from "net";
import crypto from "crypto";

const number = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
// 每个人连接 都会产生一个 socket (套接字)
const server = net.createServer((socket) => {
  //   socket.on('data', data => {
  //     console.log(data.toString())
  //   })

  // 报文 都是用 换行 来分割的
  // 报文 都是用 换行 来分割的
  // 报文 都是用 换行 来分割的
  socket.once("data", (data) => {
    // console.log(data.toString());
    const dataString = data.toString();
    if (dataString.match("Upgrade: websocket")) {
      let rows = dataString.split("\r\n");
      // console.log(rows)

      const httpHeaders = rows.slice(1, -2).reduce((result, item) => {
        let [key, val] = item.split(": ");
        result[key] = val;
        return result;
      }, Object.create(null));

      const websocketKey = httpHeaders["Sec-WebSocket-Key"];

      const result = crypto
        .createHash("sha1")
        .update(websocketKey + number)
        .digest("base64");

      // 响应报文
      let response = [
        "HTTP/1.1 101 Switching Protocols",
        "Upgrade: websocket",
        `Sec-Websocket-Accept: ${result}`,
        "Connection: Upgrade",
        "\r\n",
      ].join("\r\n");
      socket.write(response);


      socket.on("data", (buffers) => {
        // 解析 websocket 格式

        // websocket 数据格式非常经典， 有固定的规则， 每个字节 8个位， 根据字节来操作
        // 一个字节是 8个 位
        const fin = (buffers[0] & 0b10000000) === 0b10000000 // true 的话，表示已经完成了
        // console.log(fin)

        const opcode = (buffers[0] & 0b00001111); // 1 表示是文本
        // console.log(opcode)

        // 客户端给服务端发消息 是 掩码
        const mask = (buffers[1] & 0b10000000) === 0b10000000; // 1的话 需要 掩码
        // console.log(mask)

        const payloadLength = buffers[1] & 0b01111111;
        // console.log(payloadLength)

        const maskKey = buffers.slice(2, 6); // 掩码 长度 4个 字节
        const maskingKey = buffers.slice(6); // 这个数据 被 掩码， 需要做 异或操作

        for (let i = 0; i < maskingKey.length; i++) {
          maskingKey[i] = maskingKey[i] ^ maskKey[i % 4];
        }

        console.log(maskingKey.toString()); // 客户端给 服务端发送的消息

        // 服务端如果想给客户端发消息， 按照一样的格式即可。(服务端给客户端发送消息，不需要 +掩码)
      });
    }
  });
});

server.listen(3000, () => {
  console.log("net server is running");
});
