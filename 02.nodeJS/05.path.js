/*
*path 模块
* path 模块提供了一些工具函数，用于处理文件与目录的路径。可以通过以下方式使用：
 */
var path = require("path");
//normalize 格式化文件名
var pathname = "game/index/./about/../catalogue/af/b/./c/../d";
console.log(path.normalize(pathname));// game/index/catalogue/af/b/d

//join将文件名进行拼接
var pathname = "game/index";
var pathname2 = "/about/about.html";
console.log(path.join(pathname,pathname2));//  game/index/about/about.html
console.log(path.join(__dirname,pathname2));// /Users/lanou/Desktop/nodeJS/02.nodeJS/about/about.html

//将resolve将文件名变成一个绝对地址
var pathname = "/game/index";
var pathname2 = "about/about.html";
console.log(path.resolve(pathname,pathname2));//  /game/index/about/about.html
