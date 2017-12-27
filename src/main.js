// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import ElementUI from 'element-ui';
import axios from 'axios'

Vue.prototype.$http = axios
import 'element-ui/lib/theme-chalk/index.css';

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})

Vue.filter('DateTransform',function(d) {
    let now = new Date(d);
    return now.getFullYear() + '年' + now.getMonth() + '月' + now.getDate() + '日 ' + now.getHours() + ':' + now.getMinutes()
})