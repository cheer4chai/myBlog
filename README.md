# vue-blog

> cheerBlog

在线地址：http://www.chaiyanchen.top

# 前言

本项目为前后端分离的一个个人博客项目，开发的目的是为自己搭建一个个人网站的同时熟悉并可以深入了解一下vue以及nodejs来作为后台语言进行开发的应用，项目从开始到现在因为只是利用业余时间来做，从开始到基本完成大概花了两个多月的时间，UI方面在设计上参考了一个国外博物馆网站的风格，UI组件库为了图方便直接使用了element-ui，下一步准备将项目的组件都自己实现，进一步熟悉vue开发。

另：关于我的简历中的动态效果来自于 [https://github.com/jirengu-inc/animating-resume](https://github.com/jirengu-inc/animating-resume)


## 技术栈

后端：nodejs + express + mongodb

前端：vue + vue-rounter + axios + webpack


## 项目运行

``` bash
# install dependencies
yarn install or npm install

# 连接数据库开启后端服务
数据库使用的是mongodb，因此需要在本地安装 [mongodb](https://www.mongodb.com/download-center?jmp=nav)，并在本地运行，数据库地址写在了server/db.js中，如需更改在该文件中更改，运行数据库后执行命令开启后端服务

mongod --dbpath xxxxx

npm run server

# serve with hot reload at localhost:2000
dev模式

npm run dev

访问 http://localhost:2000

# build for production with minification
生产模式

npm run build


```


# 说明

> 如果本项目对于您有帮助，您可以点右上角 "Star" 支持一下 谢谢！

> 欢迎PR~



# 项目布局
```
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
│  │  ├─frontend                                 //前台展示  
│  │  │       article.vue                        //文章详情                    
│  │  │       blog.vue                           //文章列表页    
│  │  │       Hello.vue                          //博客首页              
│  │  │       login.vue                          //登录页 
│  │  │       project.vue                        //项目展示页
│  │  │      
│  │  └─resume                                   //简历展示页面
│  │          index.vue                          //入口，导向pc及手机端
│  │          mobile.vue                         //手机端
│  │          pc.vue                             //pc端
│  │          ResumeEditor.vue                   //内容显示组件
│  │          StyleEditor.vue                    //样式显示组件

│  │                                             //             
│  └─router                                      //          
│          router.js                             //路由文件
│                                                //          
└─static                                         //       
    └─UE                                         //ueditor前台配置文件
```
