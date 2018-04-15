/*目录操作*/
var fs = require("fs");
//创建目录
//文件的mode(权限); 权限分为三层：用户，群组，任何人
//权限设置使用三位八进制表示
//权限分别用数字代表，数字相加和代表权限和代表权限的集成
//可执行：1  可写：2  可读：4
// fs.mkdir("007",0777,function(err){
//     if(err){
//         console.log(err);
//         console.log(err);
//     }else{
//         console.log("创建成功");
//     }
// });
//读取目录
// fs.readdir(".",function (err,list) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(list);
//     }
// })
// })
//文件或者目录详情
fs.stat("new.txt",function (err, stats) {
    if(err){
        console.log(err);

    }else{
        console.log(stats);
        //atime:最近被访问的时间
        //mtime:文件数据最近被修改的时间
        //ctime:修改这个文件的权限的时间
    }
});

