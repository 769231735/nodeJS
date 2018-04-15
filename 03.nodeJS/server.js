var http = require("http");
var url = require("url");
var fs = require("fs");
var querystring = require("querystring");// 解析urlencode编码，将传过来参数解析成键值对的对象
var formidable = require("formidable");//第三方模块，npm安装的
//formidable模块实现了上传和编码图片和视频。
//它支持GB级上传数据处理，支持多种客户端数据提交。有极高的测试覆盖率，非常适合在生产环境中使用

http.createServer(function(req,res){
    //<1>.使用url模块来将用户请求url进行解析，得到想要的路径
    //<2>.url.parse的第二个参数可以将query里的传入的参数有字符串转变成对象，这里只用到pathname所以不用设置参数
    //<3>.有时候我们请求的index.html页面，但是这个页面又请求了其他的资源，如css和js或者图片等资源，但是我们通常在
    //此页面的network里找到请求，所得到的请求都会在server.js里的req进行接收，然后res进行回应(注意设置请求头)

    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;//获得文件名，将携带的参数去掉了，这样才方便我们解析参数
    console.log(pathname);
    //最上面设置返回信息的响应头，不然返回的汉字乱码
    res.writeHead(200,{"content-Type":"text/html;charset=utf8"});
    //这里的post请求是通过表单传的请求，post
    if(pathname=="/post"){
        //在服务器中通过流拿到以post传输的数据,
        // var str = '';
        // req.on("data",function(chunk){
        //     str+=chunk;
        // });
        // req.on("end",function(){
        //     console.log(str);//user=11&pass=11
        //     var query = querystring.parse(str);
        //     console.log(query);//{ user: '11', pass: '11' }
        // });
        // //这里是分两个例子进行讲解的，因此写的时候是将前面的注释了才写这个了
        // //这里指的是发送请求之后，就不进入其他后面的if语句里了。这样就不会进入后面的通用的条件语句里，如404页面
        // res.end("this is post request我爱你");

        //上传文件的操作
        var form = new formidable.IncomingForm();
        form.parse(req,function (err,fileds,files) {
            console.log(fileds);//{ user: 'hejun', pass: '123546' } 这里的user和pass是input的name名
            console.log(files);//
            console.log(files.files.name);
            console.log(files.files.type);
            var readStream = fs.createReadStream(files.files.path);
            var writeStream = fs.createWriteStream("images/"+files.files.name);
            readStream.pipe(writeStream);

        })
        //这里指的是发送请求之后，就不进入其他后面的if语句里了。这样就不会进入后面的通用的
        res.end("this a file upload");
    }

    if(pathname=="/ajax"){
        var str = '';
        req.on("data",function (chunk) {
            str+=chunk;
        });
        req.on("end",function () {
            console.log(str);
            var query=querystring.parse(str);
            console.log(query);

        });
        res.end(); //每个end之后就不会往下面进行执行了，相当于结束了请求。
    }
    //这好似nodejs模拟的get客户端请求的处理
    if(pathname=="/index/index"){
        var query = urlObj.query;
        console.log(query);
        //设置状态码
        res.statusCode = 200;
        res.end();
    }
//这好似nodejs模拟的post客户端请求的处理

    if(pathname=="/index/index2"){
        var str = '';
        req.on("data",function (chunk) {
            str+=chunk;
            console.log(str)
        });
        res.statusCode = 200;
        res.end('{"status":1,"errMsg":"数据接收成功"}');
    }

    //这里封装一个函数，如果服务器中有这个文件就加载进来。没有就404.html页面
    var path = "." +pathname;
    if(fs.existsSync(path)){
        fs.createReadStream(path).pipe(res);
    }else{
        res.statusCode = 404;//
        fs.createReadStream("404.html").pipe(res);
    }

}).listen(1111);
