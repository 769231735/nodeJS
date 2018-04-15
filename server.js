// node不是一种新的语言，他采用的common.js标准，node.js运行于服务器端
// nodejs的特点：
// 1.跨平台
// 2.单线程
// 3.异步回调
// 4.事件驱动
// 5.模块化

// nodejs的使用场景：高并发的请求环境（在线聊天，即时消息推送，小游戏，）封装一些小的工具（express,gulp,webpack）
//
// 引入http模块，使用createServer方法创建node本地服务器

// 模块：
// 1.核心模块（在node安装时自带的）（http,events,fs,path）
// 2.第三方模块（别人封装的模块，通过下载使用）(express,gulp,)
// 3.自定义模块（自己封装的模块）(hello.js)
var http = require("http");//核心模块以及第三方模块引入时，直接取模块名
var server = http.createServer(function(request,response){
    // request:代表是每次在浏览器中向服务器所发送的请求内容
    // response:响应，服务器向浏览器返回的一些内容
    // console.log(request);
    // console.log(response);
    console.log(request.url);//本次请求的地址
    console.log(request.method);//本次请求的方法
    // response.end("hello world");
    response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    if(request.url=="/game/index.html"){
        //结束本次响应，遇到第一个end相当于返回的东西就已经结束了，后面再有end也不执行
        //end可以什么都不传，如果没有end，那么就表示服务器response未结束
        //end()里只能传入字符串，其他的都不行，数字也不行
        // response.end("我是游戏首页啊");
        // response.end("1111");
        response.write("hhh");
        response.write("jjjj");
        response.end("rrr");
    }else{
        response.end("hello world");
    }
})
// 经上步所创建的服务需要加上端口号来使用
server.listen(1111);
