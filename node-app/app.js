const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//实例express
var app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
//设置模板引擎
app.set("view engine","ejs");
app.set("views","./views");
//链接数据库
mongoose.connect("mongodb://localhost:27017/house");
//获得数据库对象
var db = mongoose.connection;
db.once("open",function () {
    console.log("数据库连接成功");
})
db.on("error",function (err) {
    console.log(err);
});
//构建集合的骨架搭建
var schema = new mongoose.Schema({
    user:{
        type:String,
        default:"张三"
    },
    age:{
        type:Number,
        default:18
    }
},{
    collection:"person"
});
//创建模型,才能对文档进行增删改查操作。
var Model = db.model("person",schema);

app.get("/index.html",function (req,res) {
    Model.find({},function (err,docs) {
        console.log(docs);
        res.render("index.ejs",{
            dataList:docs
        })

    })


})
//添加数据
app.post("/add",function (req,res) {

    console.log(req.body);
    Model.create({user:req.body.username,age:req.body.age},function (err,doc) {
        if(err){
            console.log(err);
            return;
        }
        console.log(doc);
    })
    //查询操作
    Model.find({},function (err,docs) {
        console.log(docs);
        res.render("index.ejs",{
            dataList:docs
        })

    })
})
//删除数据
app.post("/del",function (req,res) {

    console.log(req.body._id);
    var _id = req.body._id;
    Model.remove({_id:_id},function (err,msg) {
        if(err){
            console.log(err);
            return;
        }
        console.log(msg);
    })
    //查询操作
    Model.find({},function (err,docs) {
        console.log(docs);
        res.render("index.ejs",{
            dataList:docs
        })

    })
})
//获取其他静态文件
app.get("*",function (req,res) {
    var path = __dirname+req.path;// /index.html

    if(fs.existsSync(path)){
        res.sendFile(path);
    }else{
        res.sendFile(__dirname+"/views/404.html");
        //不用加end（），sendFile后：默认流结束
    }
})






app.listen(8888);