var http = require("http");
var fs = require("fs");
http.createServer(function (req,res) {
    //使用流就不需要加end
    //数据以数据流的形式流向res
    if(req.url=="/"){
        var rs = fs.createReadStream("index.html");
        rs.pipe(res);

    }
    // 加载引入的css文件
    if(req.url=="/index.css"){
        var rs = fs.createReadStream("index.css");
        rs.pipe(res);
    }
    //加载

    var path = "."+req.url;
    if(fs.existsSync(path)){
        // 文件存在
        var rs = fs.createReadStream(path);
        rs.pipe(res);
    }else{
        res.statusCode = 404;//状态码的设置
        var rs = fs.createReadStream("404.html");
        rs.pipe(res);
    }

}).listen(7777);
