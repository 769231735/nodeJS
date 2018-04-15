//node 的http模块除了可以进行服务器的创建，同样可以模拟客户端发送请求
//此时client.js 实质上就是浏览器
var http = require("http");
var request = http.request({
    host:"localhost",
    port:"1111",
    path:"/index/index?code=sdfaf&openid=8888",
    method:"get"
},function (res) {
//    客户端的res也是一个可读流
//    res是服务器返回客户端的响应
//     console.log(res);
    var str = "";
    res.on("data",function (chunk) {
        str+=chunk;
        console.log(str);

    })
});
//结束本次请求
request.end();