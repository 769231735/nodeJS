/*
*express是node辅助框架之一，轻量，简洁，操作方便。
* 1.路由
* 2.中间件
* 3.模板引擎
 */
const express = require("express");//是一个函数

//实例一个应用程序(通过http.createServer()创建的服务器);
var app = express();

//get请求的接受
app.get("/",function (req,res) {
    // console.log(req.url);
    res.send("哈哈哈");
});
app.get("/index.html",function (req,res) {
    //访问    http://localhost:3000/index.html?q=xxx&count=1000
    //req的常用属性
    console.log(req.url);//index.html?q=xxx&count=1000  原生方法里的req.url
    console.log(req.path);//index.html 返回请求的url路径名
    console.log(req.query);//{ q: 'xxx', count: '1000' } 返回问号后所带的参数
    //是一个获取客户端，get请求路径参数的对象属性，包含着被解析过的请求参数对象，默认为对象，直接可以拿过来用
    console.log(req.method);// GET 返回请求的方法
    console.log(req.hostname);// localhost 返回请求的主机名
    // req.params;//获取路由自己设置的参数
    //res的常用属性
    //res.send();//返回数据，默认会将里面的参数自动转换成字符串，编码为utf8
    //res.sendFile();返回文件，其参数为绝对路径，res.sendfile();里面的参数为相对路径，但是已废弃不用
    //res.sendStatus();返回状态码
    res.sendFile(__dirname+req.path);//参数必须为绝对路径
});
//作业
//请使用所学express进行对任何文件的处理
//使用express对post请求数据接受，并返回浏览器一个json字符串

//添加端口号
app.listen(3000);

