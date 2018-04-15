/*文件操作*/
//写入文件
var fs = require("fs");
fs.writeFile("test.txt","我是写入的内容",{
    encoding:"utf8",//默认为null
    flag:"a"//默认为“r”覆盖，改为a(append)就是追加
    //append read write
},function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("写入成功")
    }
})
//追加写入
fs.appendFile("test.txt","我是追加的内容",function (err) {
    if(err){
        console.log("err");
    }else {
        console.log("追加成功");
    }
})

//封装一个copy函数，参数分别为sourcePath,destPath,函数的目的是将sourcePath文件复制到destPath上
function copy(sourcePath,destPath) {
    fs.readFile(sourcePath,"utf8",function (err,data) {
        if(err){
            console.log(err);

        }else{
            fs.writeFile(destPath,data,function (err) {
                if(err){
                    console.log(err);
                }else{
                    console.log("复制成功");
                }
            })
        }
    })
}
copy("test.txt","test1.txt");

//判断文件或者目录存在与否,如果存在返回true,反之返回false
var bol = fs.existsSync("../test");
console.log(bol);
//重命名：对文件和目录都生效
fs.rename("test.txt","new.txt",function (err) {
    if(err){
        console.error(err);
        return;
    }
    console.log("重命名成功");
});