//node 的http模块除了可以进行服务器的创建，同样可以模拟客户端发送请求
//此时client.js 实质上就是浏览器
//post请求
var http = require("http");
var request = http.request({
    host:"localhost",
    port:"1111",
    path:"/index/index2",
    method:"post"
},function (res) {
//    res是服务器返回客户端的响应
//     console.log(res);
    var str = "";
    res.on("data",function (chunk) {
        str+=chunk;
        console.log(str);

    })
});
//发送post请求参数
request.write('code=1111&openid=214545');
request.end();