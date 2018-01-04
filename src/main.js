// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'

Vue.prototype.$http = axios
import 'element-ui/lib/theme-chalk/index.css';

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})

Vue.filter('DateTransform', function(d) {
    let now = new Date(d);

    function LENFix(i, n) {
        var sRet = i.toString();
        while (sRet.length < n) {
            sRet = "0" + sRet;
        }
        return sRet;
    }
    return now.getFullYear() + '年' + LENFix(now.getMonth() + 1, 2) + '月' + LENFix(now.getDate(), 2) + '日 ' + LENFix(now.getHours(), 2) + ':' + LENFix(now.getMinutes(), 2)
})