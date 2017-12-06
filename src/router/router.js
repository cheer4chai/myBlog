import Vue from 'vue'
import Router from 'vue-router'

import App from '../App.vue'
import hello from '../components/Hello.vue'
import login from '../components/login.vue'
import blog from '../components/blog.vue'
import article from '../components/article.vue'

import backend from '../components/backend/backend.vue'
import editor from '../components/backend/editor.vue'
import articleList from '../components/backend/articleList.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: App,
        children: [{
                path: '',
                redirect: '/home'
            },
            {
                path: '/home',
                component: hello,
                redirect: '/home/blog',
                children: [{
                    path: 'blog',
                    component: blog
                }]
            },
            {
                path: '/article/:articleId',
                component: article
            }, {
                path: '/login',
                component: login
            }, {
                path: '/backend',
                component: backend,
                redirect: '/backend/articleList',
                children: [{
                    path: 'editor',
                    component: editor
                }, {
                    path: 'articleList',
                    component: articleList
                }]
            }
        ]
    }]
})