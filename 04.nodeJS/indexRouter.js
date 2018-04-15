/*
* 这是一个专门处理Index下的路由文件
* 一个路由专门设置一个js文件
* */
const express = require("express");
var IndexRouter = express.Router();
IndexRouter.get("/login",function (req,res) {
    res.send("您请求的是"+req.path);
})
IndexRouter.get("/register",function (req,res) {
    res.send("你该注册了");
})
IndexRouter.get("*",function (req,res) {
    res.send(req.path);
});
module.exports = IndexRouter;