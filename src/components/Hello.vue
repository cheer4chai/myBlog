<template>
  <div class="w_1200" id="content">
<header>
  <h2>My Blog</h2>
</header>
<nav class="trees">
  <a href="">关于技术</a>
  <a href="">随笔</a>
  <a href="">作品</a>
  <a class="last" href="">常用资源</a>
</nav>
<router-view></router-view>
  </div>
</template>

<style>

.w_1200{
  width: 1200px;
  margin: 0 auto;
}
#content{
  padding-top: 80px;
}
#content header h2 {
    background: #000;
    color: #fff;
    text-align: center;
    width: 880px;
    padding: 35px 80px;
    margin: 0 auto;
    letter-spacing: 1px;
}
nav.trees {
    text-align: center;
    clear: both;
    position: relative;
    margin: 80px 0 60px;
    letter-spacing: -3px;
}
nav.trees:before {
    content: '';
    position: absolute;
    background: #000;
    width: 5px;
    height: 105px;
    left: 50%;
    margin-left: -3px;
    top: -80px;
}
nav.trees a {
    width: 172px;
    border: 4px solid #000;
    padding: 10px;
    display: inline-block;
    text-decoration: underline;
    font-size: 1.25em;
    margin: 0 40px;
    position: relative;
    font-family: 'Avenir LT W02 65 Medium',helvetica,sans-serif;
    font-weight: 500;
    letter-spacing: 0;
}
nav.trees a:after {
    content: '';
    position: absolute;
    background: #000;
    height: 5px;
    width: 81px;
    right: -85px;
    bottom: 50%;
}
nav.trees a.last:after{display:none}
.clearfix:after {
    clear: both;
    content: '.';
    display: block;
    visibility: hidden;
    height: 0;
}
</style>


<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
