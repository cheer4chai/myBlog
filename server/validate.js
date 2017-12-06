function account(str) {

    if (!str) {
        return '账号不可为空'
    }

    return 'success'
}

function password(str) {
    if (!str) {
        return '密码不可为空'
    }

    return 'success'
}

function user(opt) {
    if (!opt.account) {
        return '账号不可为空'
    }
    if (!opt.password) {
        return '密码不可为空'
    }
    return 'success'
}

function content(opt) {
    if (!opt.account) {
        return '账号不可为空'
    }
    if (!opt.title) {
        return '文章题目不可为空'
    }
    if (!opt.detail) {
        return '文章内容不可为空'
    }
    return 'success'
}

const validate = {
    account: account,
    user: user,
    content: content
}

module.exports = validate;