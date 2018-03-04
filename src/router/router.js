import Vue from 'vue'
import Router from 'vue-router'
// 前台
import App from '../App.vue'
import hello from '../components/frontend/Hello.vue'
import login from '../components/frontend/login.vue'
import blog from '../components/frontend/blog.vue'
import article from '../components/frontend/article.vue'
import project from '../components/frontend/project.vue'
import resource from '../components/frontend/resource.vue'
//后台
const backend = ()=> import('../components/backend/backend.vue')
const editor = ()=> import('../components/backend/editor.vue')
const articleList = ()=> import('../components/backend/articleList.vue')
const articleDetail = ()=> import('../components/backend/articleDetail.vue')
const commentList = ()=> import('../components/backend/commentList.vue')

//简历
const resumeIndex = ()=> import('../components/resume/index.vue')

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
                }, {
                    path: '/article/:articleId',
                    component: article
                }, {
                    path: 'project',
                    component: project
                }, {
                    path: 'resource',
                    component: resource
                }]
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
                }, {
                    path: '/backend/articleList/id/:id',
                    component: articleDetail
                }, {
                    path: 'commentList',
                    component: commentList
                }]
            }, {
                path: '/resume',
                component: resumeIndex
            }
        ]
    }]
})