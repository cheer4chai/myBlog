//引入接口文件
const api = require('./api');
//引入文件模块
const fs = require('fs');
//引入处理路径模块
const path = require('path');
//引入处理post数据模块
var bodyParser = require('body-parser');

//引入express
const express = require('express');
const app = express();
//引入ueditor
const ueditor = require("ueditor")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//更改限定大小
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// parse application/json
app.use(bodyParser.json())
app.use(api)

app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
    //客户端上传文件设置
    var imgDir = '/img/ueditor/'
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir; //默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('../nodejs/config.json');
    }
}));

//处理静态文件 todo
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, 'public/')))
app.use('/ueditor', function(req, res) {
    res.render('views/');
});
// app.use('/index', function(req, res) {
//     res.render('../../dist/index.html');
// });
//监听8888端口
app.listen(8888);
console.log('sucess listen......')