var events = require("events");
var util = require("util");
function Goddness() {
}
function Boy(name,response) {
    this.name = name;
    this.response = response;
}
var boy1 = new Boy("備胎一號",function () {
    console.log("去買新巴克")
});
var boy2 = new Boy("備胎二號",function () {
    console.log("買了杯豆漿");
})
var goddess = new Goddness();

util.inherits(Goddness,events);

//设置最大监听者数
// goddess.setMaxListeners(1);

goddess.on("ele",function () {
    console.log("请喝奶茶");
});

goddess.once("birth",function () {
    console.log("又一位女神诞生了");
});
goddess.addListener("ele",boy1.response);
goddess.addListener("ele",boy2.response);

// setTimeout(function () {
// //发布这个事件
//     goddess.emit("ele");
//     goddess.emit("birth");
// },2000);

//移除监听者（boy1）
goddess.removeListener("ele",boy1.response);
//移除某个事件的全部监听者
// goddess.removeAllListeners("ele");

goddess.emit("ele");
goddess.emit("birth");
