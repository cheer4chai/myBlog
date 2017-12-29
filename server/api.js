"use strict"

const models = require('./db');
const validate = require('./validate');
const express = require('express');
const request = require('request');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const xml2js = require('xml2js');

const router = express.Router();

const parseString = xml2js.parseString;

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
        //var account = req.session.account[0];
        res.send({ code: 200, msg: 'online' });
    } else {
        res.send({ code: 201, msg: 'offline' });
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
                    res.send({ code: 200, sucess: '登陆成功' });
                } else {
                    res.send({ code: 201, error: '密码错误，请重新输入' });
                }

            } else if (data.length == 0) {
                res.send({ code: 201, error: '无该账号，请注册' });
            } else {
                res.send({ code: 201, error: '登录失败' });
            }
        }
    });
})

//储存文章接口
router.post('/api/account/createContent', (req, res) => {
    if (req.session.account) {
        let sendObj = {
            account: req.body.account,
            title: req.body.title,
            image: req.body.image,
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
    } else {
        res.send({ code: 300, sucess: '请登录' });
    }
})

//获取文章列表&分页接口
router.get('/api/account/getArticleList', (req, res) => {
    models.Content.count({}, (err, count) => {
        models.Content.find().limit(parseInt(req.query.pageSize)).skip(parseInt(req.query.pageSize) * parseInt(req.query.count)).exec((err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    data: data,
                    count: count
                });
            }
        })
    })

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
    if (req.session.account) {
        let sendObj = {
            account: req.body.account,
            title: req.body.title,
            summary: req.body.summary,
            detail: req.body.detail,
            cat: req.body.cat,
            image: req.body.image,
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
    } else {
        res.send({ code: 300, sucess: '请登录' });
    }
})

//删除文章接口
router.get('/api/account/deleteContent', (req, res) => {
    if (req.session.account) {
        models.Content.findOne({ _id: req.query.id }, (err, doc) => {
            if (err) {
                res.send(err)
            } else {
                models.Content.remove({ _id: req.query.id }, (err) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send({
                            code: 200,
                            success: 'delete success!'
                        })
                    }
                })
            }
        })
    } else {
        res.send({ code: 300, sucess: '请登录' });
    }
})

//评论接口
//新增评论接口
router.post('/api/account/createComment', (req, res) => {
    let sendObj = {
        articleId: req.body.articleId,
        name: req.body.name,
        content: req.body.content,
        status: 'unreviewed',
        time: new Date()
    }
    let result = validate.comment(sendObj);
    if (result == 'success') {
        let newComment = new models.Comment(sendObj);
        // 保存数据newAccount数据进mongoDB
        newComment.save((err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send({ sucess: 'createComment successed' });
            }
        });
    }
})

router.get('/api/account/getComment', (req, res) => {
    models.Comment.find(req.query, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

//查询评论接口
router.get('/api/account/getCommentList', (req, res) => {
    models.Comment.count({}, (err, count) => {
        models.Comment.find().limit(parseInt(req.query.pageSize)).skip(parseInt(req.query.pageSize) * parseInt(req.query.count)).exec((err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    data: data,
                    count: count
                });
            }
        })
    })
})


//评论删除接口
router.get('/api/account/deleteComment', (req, res) => {
    if (req.session.account) {
        models.Comment.findOne({ _id: req.query.id }, (err, doc) => {
            if (err) {
                res.send(err)
            } else {
                models.Comment.remove({ _id: req.query.id }, (err) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send({
                            code: 200,
                            success: 'delete success!'
                        })
                    }
                })
            }
        })
    } else {
        res.send({ code: 300, sucess: '请登录' });
    }
})

router.get('/api/getCNBlog', (req, res) => {
    let url = 'http://wcf.open.cnblogs.com/blog/TenDaysTopDiggPosts/3';
    let data = {}
    request(url, (error, response, body) => {
        parseString(body, (err, result) => {
            res.send({
                code: 200,
                data: result
            })
        });
    })
})

module.exports = router;