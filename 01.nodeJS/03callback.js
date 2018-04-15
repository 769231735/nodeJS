var fs = require("fs");
//异步写法
fs.readFile("mine.js","utf8",function (err,data) {
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
});
//同步的写法(通过返回值来获取data)

// var data = fs.readFileSync("mine.js","utf8");
// console.log(data);
console.log("我是读取之后");
