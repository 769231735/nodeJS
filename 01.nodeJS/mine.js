/*自定义模块
*一个模块文件代表一个独立的域，他内部经过定义的变量和方法都需要导出，才能供引入该模块的文件进行使用
* 模块的导出：module.exports
* 模块的引入：require
 */
var mine2 = require("./mine2");
var hello = "world";
function test(x) {
    return hello +x;
}
module.exports = {
    hello:hello,
    test:test
}