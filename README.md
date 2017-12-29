# vue-blog

> cheerBlog

本项目为前后端分离的一个个人博客项目，后端由nodejs+express+mongodb编写符合RESTful API设计规范的后台接口，前端分为前台展示和后台管理两个模块，UI使用部分element-ui，框架使用vue+vue-rounter+axios完成开发。

## Build Setup

``` bash
# install dependencies
npm install

# start server by node
node ./server/index.js

# serve with hot reload at localhost:2000
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 项目布局

```
.
│  
├─build
│      
├─config                                         //webpack配置文件
│                                                //
├─server                                         //nodejs后台文件
│  │  api.js                                     //api配置 
│  │  db.js                                      //MongDB配置文件     
│  │  index.js                                   //后台主文件   
│  │  validate.js                                //各种验证方法           
│  │                                             //     
│  ├─public                                      //用于ueditor存放上传至后台文件     
│                                                //          
├─src                                            //前端代码目录  
│  │  App.vue                                    //入口文件
│  │  main.js                                    //入口文件，加载组件        
│  │                                             //     
│  ├─assets                                      //存放静态文件                
│  │                                             //         
│  ├─components                                  //组件文件夹          
│  │  ├─backend                                  //后台管理         
│  │  │      articleDetail.vue                   //文章详情页                     
│  │  │      articleList.vue                     //文章列表页                      
│  │  │      backend.vue                         //后台首页                  
│  │  │      commentList.vue                     //评论列表                       
│  │  │      editor.vue                          //文章编辑                  
│  │  │      UE.vue                              //Ueditor组件              
│  │  │                                          //            
│  │  └─frontend                                 //前台展示  
│  │          article.vue                        //文章详情                    
│  │          blog.vue                           //文章列表页    
│  │          Hello.vue                          //博客首页              
│  │          login.vue                          //登录页 
│  │          project.vue                        //项目展示页
│  │                                             //             
│  └─router                                      //          
│          router.js                             //路由文件
│                                                //          
└─static                                         //       
    └─UE                                         //ueditor前台配置文件
.


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
