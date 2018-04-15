/*
*1.Buffer:node为了处理请求与响应中以及文件I/O(读取和写入)二进制数据，所以提供了Buffer类，通过实例化Buffer创建一个二进制缓存区
*2.未进行解析的Buffer以Buffer数组的形式展示，数组的每一位是由一个8位二进制数转换成的十六进制数。
 */
var fs = require("fs");
//字节是计算机信息技术用于计量存储容量和传输容量的一种计量单位，1个字节(1B)等于8位二进制。
//Buffer的初始化
const buf1 = Buffer.alloc(10,"f");//1.新建的Buffer期望的长度，占缓存空间10B、2，填充的是新建的buffer值，默认为0
console.log(buf1);//<Buffer 66 66 66 66 66 66 66 66 66 66>
//Buffer的填充
buf1.fill(254,3,6);//第一个参数为要填充的内容，第二个参数为填充的开始下标，第三个参数是填充结束的下标(不包括下标为6的)
console.log(buf1);//<Buffer 66 66 66 fe fe fe 66 66 66 66>
//Buffer.from参数为数组
const buf2 = Buffer.from([254,054,0xa4]);//es5中八进制用0表示，在es6中用0o表示，16进制用0x表示
console.log(buf2);//<Buffer fe 2c a4>

//Buffer.from参数为字符串
const buf3 = Buffer.from("今天下雨啦");//这里面一个汉字三个字节
console.log(buf3);//15位  <Buffer e4 bb 8a e5 a4 a9 e4 b8 8b e9 9b a8 e5 95 a6>
const buf4 = Buffer.from([0xe4,0xbb ,0x8a, 0xe5 ,0xa4, 0xa9,0xe4]);
console.log(buf4.toString());//今天�

//Buffer的拼接 //缺点占用的内存高
const buf5 = Buffer.from([0xb8, 0x8b ,0xe9 ,0x9b ,0xa8 ,0xe5 ,0x95 ,0xa6]);
console.log(buf5.toString());//��雨啦
const buf6 = Buffer.concat([buf4,buf5]);
console.log(buf6.toString());//今天下雨啦

//如果出现Buffer不全，可以使用string-decoder解析，//Node中推荐使用的方式
const StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder();
console.log(decoder.write(buf4));//今天
console.log(decoder.write(buf5));//下雨啦
