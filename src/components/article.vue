<template>
  <div class="article-detail">
    <article class="acricle">
      <h1 class="article-title">{{blogData.title}}</h1>
      <section class="published">
        <time class="pubdate">
          {{blogData.time}}
        </time>
      </section>
      <div class="text">
        <blockquote v-html="blogData.summary"></blockquote>
        <div v-html="blogData.detail"></div>
      </div>
        <section class="comments">
          <h2>
            <a href="javascript:;" @click="showComment=!showComment">Add a Comment</a>
          </h2>
          <transition name="fade">
          <article v-show="showComment">
            <form action="" class="commentsform">
            <p class="name">
              <label for="id_name">姓名</label>
              <input type="text" id="id_name">
            </p>
            <p class="email">
              <label for="id_name">邮箱</label>
              <input type="text" id="id_name">
            </p>
            <p class="comment">
              <label for="id_comment">评论</label>
              <textarea cols="40" id="id_comment" name="comment" rows="10"></textarea>
            </p>
            <p>
              <input type="submit" name="post" class="submit" value="提交">
            </p>
            </form>
           
          </article>
        </transition>
          
        </section>
      	<nav class="news-transport">
            <a href="/news/blog/2017/holiday-open-hours-and-activities" class="previous">上一篇</a>
            <a href="/news/mine-the-dowse-shop/2017/the-dowse-christmas-gift-guide" class="next">下一篇</a>
    	</nav>
    </article>
	<footer id="footer"></footer>
  </div>
</template>

<script>
export default {
  name: "artcle",
  data() {
    return {
      blogData: {},
      showComment: false
    };
  },
  mounted() {
    let url = "/api/api/account/getContent?_id=" + this.$route.params.articleId;
    this.$http.get(url).then(response => {
      console.log(response);
      this.blogData = response.data[0];
    });
  }
};
</script>

<style scoped>
body .article-detail .article-title {
  position: relative;
  border: 5px #000 solid;
  text-align: center;
  width: 750px;
  padding: 30px 30px 25px;
  margin: 40px auto;
  font-size: 35px;
  font-family: "Avenir LT W02 65 Medium", helvetica, sans-serif;
  font-weight: 500;
}
body .article-detail .article-title:after {
  content: "";
  position: absolute;
  background: #000;
  width: 5px;
  height: 40px;
  bottom: -45px;
  left: 50%;
  margin-left: -2px;
}
body .article-detail .published {
  border-top: 5px solid #000;
  width: 820px;
  margin: 0 auto;
  padding: 0;
}
body .article-detail .published .pubdate {
  display: block;
  margin: 10px 0 0;
}
body .article-detail .text blockquote {
  margin: 0;
  padding: 40px 10px;
  font-size: 17px;
}
body .article-detail .text {
  margin: 0 auto;
  width: 600px;
}
.comments {
  width: 820px;
  margin: 0 auto;
  padding: 0;
  position: relative;
  margin-top: 40px;
  border-top: 5px #000 solid;
}
.comments h2:before {
  content: "";
  position: absolute;
  background: #000;
  width: 5px;
  height: 40px;
  top: -45px;
  left: 50%;
  margin-left: -2px;
}
.comments h2 {
  position: relative;
  border: 5px #000 solid;
  text-align: center;
  width: 260px;
  padding: 14px 10px 12px;
  margin: 40px auto 50px;
}
.comments article {
  width: 570px;
  margin: 0 auto 30px;
}
.comments .commentsform {
  margin: 0 auto;
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  float: left;
  display: inline;
  margin-left: 5px;
  margin-right: 5px;
  width: 790px;
}
.comments .commentsform p {
  margin: 0 0 10px 0;
}
.comments .commentsform input,
.comments .commentsform textarea {
  border: 1px solid #000;
  padding: 4px;
}

.comments .commentsform .name {
  float: left;
  display: inline;
  margin-left: 5px;
  margin-right: 5px;
  width: 270px;
}

.comments .commentsform .name input {
  width: 250px;
}
.comments .commentsform label {
  display: block;
  font-size: 0.9em;
}
.comments .commentsform .name label:after {
  content: " *";
}

.comments .commentsform .email {
  float: left;
  display: inline;
  margin-left: 5px;
  margin-right: 5px;
  width: 310px;
}

.comments .commentsform .email input {
  width: 250px;
}

.comments .commentsform .email label:after {
  content: " *";
}

.comments .commentsform .url {
  display: none;
}

.comments .commentsform .comment {
  float: left;
  display: inline;
  margin-left: 5px;
  margin-right: 5px;
  width: 790px;
}

.comments .commentsform .comment textarea {
  width: 530px;
}

.comments .commentsform .comment label:after {
  content: " *";
}

.comments .commentsform .submit {
  float: left;
  display: inline;
  margin-left: 5px;
  margin-right: 5px;
  width: 190px;
  background-color: #000;
  color: #fff;
  padding: 10px;
  font-size: 1.2em;
}
body .article-detail .news-transport {
    position: relative;
    margin: 0 auto;
    width: 1040px;
    font-size: 25px;
}
body .article-detail .news-transport a {
    color: #000;
    text-decoration: none;
}
body .article-detail .news-transport .next {
    position: absolute;
    right: 0;
}

</style>
