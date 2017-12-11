"use strict"

const models = require('./db');
const validate = require('./validate');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const router = express.Router();
router.use(cookieParser());
router.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'love'
}));

//注册接口
router.post('/api/account/createAccount', (req, res) => {
    console.log(req.query)
    let sendObj = {
        account: req.body.account,
        password: req.body.password,
        pic: req.body.pic
    }
    let result = validate.user(sendObj);
    if (result == 'success') {
        models.Account.find(req.body, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                if (data.length > 0) {
                    res.send('201', { error: '已有此账户，请登录', data: data })
                } else {
                    let newAccount = new models.Account(sendObj);
                    // 保存数据newAccount数据进mongoDB
                    newAccount.save((err, data) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send({ sucess: 'createAccount successed', data: data });
                        }
                    });
                }
            }
        });

    } else {
        res.send('201', { error: result });
    }

});

//session
router.get('/api/getSession', (req, res) => {
    if (req.session.account) {
        var account = req.session.account[0];
        res.send({ msg: '你好' + account.account + '，欢迎来到我的家园。', data: account });
    } else {
        res.send('木了');
    }
})
router.get('/api/saveSession', (req, res) => {
    req.session.name = 'test'
    res.send('e');
})

//登陆接口
router.get('/api/account/getAccount', (req, res) => {
    models.Account.find({ 'account': req.query.account }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            if (data.length == 1) {
                if (data[0].password == req.query.password) {
                    req.session.account = data;
                    res.send({ code: 0, sucess: '登陆成功' });
                } else {
                    res.send({ code: 1, error: '密码错误，请重新输入' });
                }

            } else if (data.length == 0) {
                res.send({ code: 1, error: '无该账号，请注册' });
            } else {
                res.send({ code: 1, error: '登录失败' });
            }
        }
    });
})

//储存文章接口
router.post('/api/account/createContent', (req, res) => {
    let sendObj = {
        account: req.body.account,
        title: req.body.title,
        summary: req.body.summary,
        detail: req.body.detail,
        cat: req.body.cat,
        time: new Date()
    }
    let result = validate.content(sendObj);
    if (result == 'success') {
        let newContent = new models.Content(sendObj);
        // 保存数据newAccount数据进mongoDB
        newContent.save((err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send({ sucess: 'createContent successed' });
            }
        });
    }
})

//查看文章接口
router.get('/api/account/getContent', (req, res) => {
    models.Content.find(req.query, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

//修改文章接口
router.post('/api/account/changeContent', (req, res) => {
    let sendObj = {
        account: req.body.account,
        title: req.body.title,
        summary: req.body.summary,
        detail: req.body.detail,
        cat: req.body.cat,
        time: new Date()
    }
    let result = validate.content(sendObj);
    if (result == 'success') {
        models.Content.update({ _id: req.body.id }, { $set: sendObj }, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        })
    } else {
        res.send('failed!');
    }
})

module.exports = router;