### 概念
SYN、ACK、Seq是什么?

位码即tcp标志位，有6种标志位：SYN(建立联机), ACK(确认), PSH(传送), FIN(结束), RST(重置), URG(紧急), Sequence number(顺序号码), Ackknowledge number(确认号码)

### tcp三次握手
第一次：client发出连接请求，SYN=1, 生成随机值Seq=123456，server接收到SYN=1知道client要求联机（SYN）

第二次：server生成随机号码ack = Seq + 1, 也生成了随机值 Seq = 34567; SYN=1, ACK=1携带发送给客户端 （SYN + ACK）

第三次：client接收到server携带的请求, 根据ACK=1判断之前发出的Seq + 1是否等于接收到的ack，若正确，则A再发送ACK=1, ack=接收到的Seq+1, server判断接收到的ack是否等于之前发出的Seq + 1 (ACK), 若正确, 连接建立

### 为啥三次握手
假设是两次握手: 服务端和客户端各握手一次
假设期间网络波动产生延迟, 在到达服务端时连接失效或者早已失效, 服务端会认为是一个新的连接请求, 接收连接并回应给客户端,
但客户端对于服务端的回应不予理睬, 不再发请求, 这时候服务端会等待客户端发后续的请求，一直夯在那里, 浪费资源

### https协议vshttp协议
https相比http多了一层ssl/tsl, https采用的是对称加密和非对称加密结合的方式
1. client向server发起请求, 服务端将公钥public_1返回给客户端
2. 客户端生成用于加解密传输内容的公钥public_2, 使用public_1加密public_2, 传给server
3. server接收到加密后的public_2, 使用私钥解密获取加密前的public_2
4. 之后客户端和服务端内容的传输都用public_2加解密

### 对称加密vs非对称加密
n台主机间的交互

加密方式 | 速度 | 密钥数量
---- | :----: | :----:
对称 | 快 | n*(n-1)
非对称 | 慢 | n对

[参考](https://www.runoob.com/w3cnote/http-vs-https.html)