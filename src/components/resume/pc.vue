<template>
  <div id="resume">
    <StyleEditor ref="styleEditor" :code="currentStyle"></StyleEditor>
    <ResumeEditor ref="resumeEditor" :markdown="currentMarkdown" :enableHtml="enableHtml"></ResumeEditor>
  </div>
</template>

<script>
  import StyleEditor from './StyleEditor'
  import ResumeEditor from './ResumeEditor'
  import '../../assets/reset.css'

export default {
  name: 'Pc',
  components: {
      StyleEditor,
      ResumeEditor
    },
    data() {
      return {
        interval: 40,
        currentStyle: '',
        enableHtml: false,
        fullStyle: [
          `/*
* Hi,all!
* 跟我一起来写一份简历吧！
*/

/* 首先给所有元素加上过渡效果 */
* {
  transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
body {
  color: rgb(222,222,222); background: rgb(0,43,54);
}
/* 文字离边框太近了 */
.styleEditor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 代码高亮 */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }

/* 加点 3D 效果呗 */
html{
  perspective: 1000px;
}
.styleEditor {
  position: fixed; left: 0; top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}

/* 接下来我给自己准备一个编辑器 */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
/* 好了，我开始写简历了 */


`,
          `
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */
`
          ,
          `
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor ul,.resumeEditor ol{
  list-style: none;
}
.resumeEditor ul> li::before{
  content: '•';
  margin-right: .5em;
}
.resumeEditor ol {
  counter-reset: section;
}
.resumeEditor ol li::before {
  counter-increment: section;
  content: counters(section, ".") " ";
  margin-right: .5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
.resumeEditor a:hover{
  text-decoration: underline;
}
`],
        currentMarkdown: '',
        fullMarkdown: `柴延晨
----

前端工程师，毕业于西安电子科技大学

技能
----

* 熟悉HTML/CSS/JavaScript 
* 了解Node.js 

工作经历
----

2016.09-至今

海南航空集团 易建科技 前端工程师

工作经历
---

#### 首都航空官网网站

* 作为团队唯一的前端负责PC端及手机端网站的日常维护以及优化改版，完成基本的页面布局并解决页面样式的兼容性问题
* 使用jQuery框架，掌握jQuery与DOM操作及事件处理，了解动态绑定事件的原理，完成网站日常业务开发，编写常见组件
* 与项目经理以及后台人员沟通，主导完成网站部分页面改版并推动前后端分离工作

#### 首都航空手机端国际票项目

* 作为前端负责人推动团队技术选型，选定Vue+vue-router+vuex+axios框架进行项目开发并完成项目架构简单搭建
* 应用es6语法进行开发，页面组件化，为团队成员分配职责编写web所用组件
* 与后台开发沟通并协定接口，通过axios获取后台数据，进行数据解析，实现与后台交互

#### 海航集团BIM统计平台

* 作为前端开发负责基本页面布局及动态效果编写，因无兼容性要求应用了部分CSS3动态效果，并应用熟悉了flex布局。
* 引用echarts插件实现对于复杂数据统计的可视化，经过查阅资料及应用，熟悉echarts的API
 
个人项目
---
#### cheer常用工具库 --> [项目源码](https://github.com/cheer4chai/cheer)

* 使用原生js封装了部分在项目常用的工具函数，例如URL等参数解析、cookie处理、数据验证等，进一步熟悉了原生js的语法及应用
* 了解了AMO/CMD/UMD模块化规范的不同和优劣，并简单使用webpack应用UMD规范封装该工具库

#### 个人博客 --> [项目源码](https://github.com/cheer4chai/myBlog)

* 采用前后端分离的开发模式，独立完成前台展示及后台管理页面视觉设计及开发，其中前端使用vue+vue-rounter，UI库使用了elementUI，实现简单的单页面应用
* 后端使用node+express，完成了包括写文章，传输图片，文章评论，爬取cnBlog数据并处理转发等功能开发，以及与mongodb数据库的交互


个人爱好
----
* 热爱健身，坚持两年以上，身体强健
* 喜欢电脑游戏，在dota2、绝地求生、炉石传说等游戏领域都颇有心得

链接
----

* [GitHub](https://github.com/cheer4chai)

`
      }
    },
    created() {
      this.makeResume()
    },

    methods: {
      makeResume: async function () {
        await this.progressivelyShowStyle(0)
        await this.progressivelyShowResume()
        await this.progressivelyShowStyle(1)
        await this.showHtml()
        await this.progressivelyShowStyle(2)
      },
      showHtml: function () {
        return new Promise((resolve, reject) => {
          this.enableHtml = true
          resolve()
        })
      },
      progressivelyShowStyle(n) {
        return new Promise((resolve, reject) => {
          let interval = this.interval
          let showStyle = (async function () {
            let style = this.fullStyle[n]
            if (!style) { return }
            // 计算前 n 个 style 的字符总数
            let length = this.fullStyle.filter((_, index) => index <= n).map((item) => item.length).reduce((p, c) => p + c, 0)
            let prefixLength = length - style.length
            if (this.currentStyle.length < length) {
              let l = this.currentStyle.length - prefixLength
              let char = style.substring(l, l + 1) || ' '
              this.currentStyle += char
              if (style.substring(l - 1, l) === '\n' && this.$refs.styleEditor) {
                this.$nextTick(() => {
                  this.$refs.styleEditor.goBottom()
                })
              }
              setTimeout(showStyle, interval)
            } else {
              resolve()
            }
          }).bind(this)
          showStyle()
        })
      },
      progressivelyShowResume() {
        return new Promise((resolve, reject) => {
          let length = this.fullMarkdown.length
          let interval = this.interval
          let showResume = () => {
            if (this.currentMarkdown.length < length) {
              this.currentMarkdown = this.fullMarkdown.substring(0, this.currentMarkdown.length + 1)
              let lastChar = this.currentMarkdown[this.currentMarkdown.length - 1]
              let prevChar = this.currentMarkdown[this.currentMarkdown.length - 2]
              if (prevChar === '\n' && this.$refs.resumeEditor) {
                this.$nextTick(() => this.$refs.resumeEditor.goBottom())
              }
              setTimeout(showResume, interval)
            } else {
              resolve()
            }
          }
          showResume()
        })
      }
    }
}
</script>
