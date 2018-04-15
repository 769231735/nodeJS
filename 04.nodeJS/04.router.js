/*
* Router:路由器，将我们的路由进行拆分，具有相同的处理方法的放在一个Router上。
* */
const express = require("express");
const app = express();

//创建一个路由器,路由器相当于是一个miniAPP，所以也能够使用get、post等对请求进行处理，同时也能够使用中间件
var IndexRouter = express.Router();

//不封装的使用
// IndexRouter.get("/login",function (req,res) {
//     res.send("您请求的是"+req.path);
// })
// IndexRouter.get("/register",function (req,res) {
//     res.send("你该注册了");
// })
// IndexRouter.get("*",function (req,res) {
//     res.send(req.path);
// })

//封装成indexRouter.js模块进行使用
const IndexRouter = require("./indexRouter");
//挂载路由器
app.use("/index",IndexRouter);
app.listen(3000);
