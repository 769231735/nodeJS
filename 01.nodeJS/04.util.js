/*
*util:实用工具，提供方便快捷的方法，供原生api，应用程序，以及开发者使用
* 1.实现原型继承
* 2.实现对象的输出
*
 */
var util = require("util");
function Dad() {

}
Dad.prototype.driving = function () {
    console.log("开宝马");
}
var dad = new Dad();
dad.driving();//开宝马
function Son() {
}
//之前用js实现继承的方法
// Son.prototype = new Dad();
// Son.prototype.constructor = Son;

//使用这个工具类来实现js的继承，超简单
util.inherits(Son,Dad)
var son = new Son();
son.driving();//开宝马

console.log(typeof son);//object
//通常我们打印一个对象，他会直接跳出一个object
//util.inspect这个方法可以将这个对象转化为类似json字符串一样，然后我们就可以看到其具体的对象结构
var str = util.inspect(son);
console.log(typeof str);//string
console.log(son);//Son{}