const express = require("express");//是一个函数
const fs =require("fs");
const querystring = require("querystring");
const bodyParser = require("body-parser");
var app = express();//函数执行后返回的对象
app.use(bodyParser.urlencoded({
    extended:true
    //req.body返回的对象是一个键值对，当extended为false的时候，键值对中的值，默认只为'String'或'Array'形式。
    // extended为true的时候，则可为任何数据类型。如果为false可能对mongodb里存数据时有影响(如存的是obj时)，因此一般设为true
}))
//对所有文件的请求都是使用get请求
//* 表示任何请求路径
app.get("*",function (req,res) {
    var path = __dirname+req.path;// /index.html

    if(fs.existsSync(path)){
        res.sendFile(path);
    }else{
        res.sendFile(__dirname+"/404.html");
    //    不用加end（），sendFile后：默认流结束
    }
})
app.post("/post",function (req,res) {
//     //如果我们使用了body-parser这个模块，那么原生的流就会相互冲突，不可同时使用
//     var str = "";
//     req.on("data",function (chunk) {
//         str+=chunk;
//
//     });
//     req.on("end",function () {
//         console.log(str);//username=123&age=23
//         console.log(querystring.parse(str));//{ username: '123', age: '123' }
//     })
    console.log(req.body);
    res.send({"staus":1,"request":"ok"});
})

//处理所有请求的请求方式
// app.all("*",function (req,res) {
//     console.log(req.path);
//     console.log(req.method);
//     res.send("ok");
// })

//获取伪静态页面中的参数（reWrite URI），如果是参数就在前面加冒号，后跟一个变量名
app.get("/index/:page/:user",function (req,res) {
    //请求的url：   http://localhost:3000/index/login/student
    console.log(req.params);//{ page: 'login', user: 'student' }
    page = req.params.page;//login
    res.send("这是"+page+"页");
})

//作业
//请使用所学express进行对任何文件的处理
//使用express对post请求数据接受，并返回浏览器一个json字符串

//添加端口号
app.listen(3000);

