//创建node的server
var http = require("http");
var url = require("url");
var server = http.createServer(function (req,res) {
    res.writeHead(200,{"content-Type":"text/html;charset=utf8"});
    var path = req.url;
    console.log(path);
    //

    var urlObj = url.parse(path,true);
    // console.log(urlObj)
    console.log(urlObj.query.code);
    res.end();

});

server.listen(8888);
