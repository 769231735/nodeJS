/*
*1.strem: 流，在对大文件或大的数据进行读取和写入的时候，容易造成内存爆仓。
* 所以提出流的概念，将大文件进行分段处理，每读出一段就会立即写入，不会一直
* 保留在内存中。每段的大小为64k
* 2.流可以分为三种：可读流，可写流，可读可写流。
* node的服务器中的request是可读流。
* node服务中的response是可写流。
 */
var fs = require("fs");
//将一个文件变成可读或可写流
var readStream = fs.createReadStream("beauty.jpg");
var writeStream = fs.createWriteStream("3.jpg");

//可读可写流都是EventEmitter的实例，可读可写流默认有一些可以监听的事件
//事件的发布者是readStream
var num = 0;
readStream.on("data",function (chunk) {
    num++;
    console.log(num)
    console.log(chunk);
    writeStream.write(chunk,function (err) {
        if(err){
            console.log(err);
        }else{
            console.log("本次写入结束");
        }
    });

})
readStream.on("end",function () {
    console.log("数据读取完成！")
});

//通过pipe(管道)将可读流直接导向可写流
readStream.pipe(writeStream);
