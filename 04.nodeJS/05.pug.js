/*
* express可以进行模板文件的数据渲染，res.render()
* */
const express = require("express");
const app = express();

//设置使用的模板引擎
//pug模板也是第三方模块,需要 npm安装
// app.set("view engine","pug");
app.set("view engine","ejs");
//设置模板文件所在的文件夹
app.set("views","./views");//可绝对路径，可相对路径
app.get("/index.html",function (req,res) {
    // res.render("pug1.pug",{
    //     title:"pug 测试",
    //     message:"这是express对pug模板文件的渲染"
    // });
    res.render("index.ejs",{
        title:"ejs 测试",
        message:"这是express对ejs模板文件的渲染"
    });
})
app.listen(1111);