/*
*中间件：放在客户端请求和服务器响应的一个中间处理过程
* 中间件的分类：
* 自定义中间件(应用级中间件，路由级中间件，错误中间件)
* 内置中间件
* 第三方中间件：(body-parser,cookie-parser,session-parser)
*  中间件的特点
*  中间件都可以对req,res进行处理
*  中间件内部req，res是一样的
*  中间件都可以通过next()向后一个中间件传递
*  中间件一般写在app创建之后，app.method之前。
*
 */
const express = require("express");
var fs = require("fs");
const querystring = require("querystring");
const bodyParser = require("body-parser");
const app = express();
//中间件的挂载使用app.use
app.use(function (req,res,next) {
    var date = new Date();
    console.log("当前时间:" + date);
    next();
})
//第一个参数写对应的路径，如果不写就默认为 "/"
// app.use(function (req,res,next) {
// //    将post参数提取出来放在req.body中
//     var str = "";
//     req.on("data",function (chunk) {
//         str+=chunk;
//     })
//     req.on("end",function () {
//         var obj = querystring.parse(str);
//         req.body = obj;
//         next();
//     })
// })

// 中间件挂载在路径是/post的应用上
app.use("/post",function (req,res,next) {
//    将post参数提取出来放在req.body中
    if(req.method=="GET"){
        var err = new Error("这是get，不能处理");
        next(err);//想要进入错误中间件，在next中加参数
        return;
    }
    //
    var str = "";
    req.on("data",function (chunk) {
        str+=chunk;
    })
    req.on("end",function () {
        var obj = querystring.parse(str);
        req.body  = obj;
        next();
    })
})
//第三方中间件 //不能和上面的中间件的处理的进行同时使用，所以原生的必须注释
app.use(bodyParser.urlencoded({
    extended:true
}))

//错误中间件
app.use(function (err,req,res,next) {
    console.error(err);
    next();
})
//
app.post("/post",function (req,res) {
    console.log(req.body);
    res.send(req.body);
})
//利用中间件实现复用
app.post("/post2",function (req,res) {
    console.log(req.body);
    res.send(req.body);
})

app.get("*",function (req,res) {
    var path = __dirname+req.path;// /index.html

    if(fs.existsSync(path)){
        res.sendFile(path);
    }else{
        res.sendFile(__dirname+"/404.html");
    //    不用加end（），默认流结束
    }
});


app.listen(3000);
