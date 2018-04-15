const mongoose = require("mongoose");
//链接数据库
mongoose.connect("mongodb://localhost:27017/house");
//获得数据库对象
var db = mongoose.connection;
db.once("open",function () {
    console.log("数据库链接成功");
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
// Model.find({},function (err,docs) {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(docs);
// });

//实例化model得到实体(Entity)
//新增
// var myEntity = new Model({
//     user:"张三",
//     age:10
// })
// myEntity.save(function (err,doc) {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(doc);
// })
//插入，插入多个用数组包起来，对象数组
Model.create({user:"李四",age:45},function (err,doc) {
    if(err){
        console.log(err);
        return;
    }
    console.log(doc);
})

//更新
//第一个参数为设置的条件，第二个参数为要修改的内容，第三个参数为修改后的回调函数。
Model.update({user:"xiaogang"},{$set:{user:"xiaohong"}},function (err,msg) {
    if(err){
        console.log(err);
        return;
    }
    console.log(msg);
})

//更新多个，加入第三个参数 {multi:true}
Model.update({user:"xiaohong"},{$set:{user:"傻逼"}},{multi:true},function (err,msg) {
    if(err){
        console.log(err);
        return;
    }
    console.log(msg);
})
//删除
//删除所有数据user名为傻逼的域，返回的是一个状态
Model.remove({user:"傻逼"},function (err,msg) {
    if(err){
        console.log(err);
        return;
    }
    console.log(msg);
})

//查询数据

//查询一条，findOne  //第一个参数写条件
Model.findOne({user:"阿美"},function (err,doc) {
    if(err){
        console.log(err);
        return;
    }
    console.log(doc);
})
//通过id查找，第一参数是id，doc返回查询的结果。 //第一个参数为_id,第二个为成功的回调函数
Model.findById("5ab1d65f519c0d1f1b40bcf1",function (err,doc) {
    if (err){
        console.log(err);
        return;
    }
    console.log(doc);
})

//查age为66，域为age，由于_id 这个域会默认出现，因此我们把他设置为0
Model.find({age:66},{age:1,_id:0},function (err,doc) {

    if(err){
        console.log(err);
        return;
    }
    console.log(doc);
})
// 查小于33岁的人
Model.find({age:{$lt:33}},function (err,docs) {
    if(err){
        console.log(err);
        return;
    }
    console.log(docs);
})

//第一个参数为条件，用户为xiaoming和age为55，第二个为要查询的字段名：域。
Model.find({user:"xiaoming",age:55},function (err,docs) {
    console.log(docs);
})
// 查用户名为xiaoming或者是年龄为55的人
Model.find({$or:[{user:"xiaoming"},{age:55}]},function (err,docs) {
    console.log(docs);
})

//查询3-6的数据
Model.find({},{},{limit:3,skip:3},function (err,docs) {
    console.log(docs);
});

//查找age为25或者age为66的人
Model.find({$or:[{age:25},{age:66}]},function (err,doc) {
    if(err){
        console.error(err);
        return;
    }
    console.log(doc);
})
// //查年龄必须为66，用户为阿静或者阿美的数据。
Model.find({age:66,$or:[{user:"阿美"},{user:"阿静"}]},function (err,docs) {
    if (err){
        console.log(err);
        return;
    }
    console.log(docs);
})

//查询所有的数据，所有的域，跳过三个，限制查询数量为3个
Model.find({},{},{limit:3,skip:3},function (err,doc) {
    if(err){
        console.error(err);
        return;
    }
    console.log(doc);
})

// 查询所有的数据，所有的域，然后年龄倒序后，跳过四个数据，查询五个
Model.find({},{},{sort:{age:-1},skip:4,limit:5},function (err,docs) {
    console.log(docs);
});

