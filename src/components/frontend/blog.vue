<template>
	<div class="detail">
		<div class="category-box">
			<h3>关于技术</h3>
		</div>
		<div class="news-wrap">
			<div class="news-article-wrapper" v-for="(item) in blogList">
				<div class="line-cross">
					<div class="line-down">
						<router-link v-if="item._id != 'CNBlog'" :to="{path: '../article/'+item._id}" class="news-article">
							<div class="vertical-aligner">
								<div class="image">
									<img :src='item.image' alt="">
								</div>
								<div class="desc">
									<hgroup>
										<h3>{{item.time | DateTransform}}</h3>
										<h4>{{item.title}}</h4>
									</hgroup>
									<p class="description">
										{{item.summary}}
									</p>
									<p class="link">Read More</p>
								</div>
							</div>
						</router-link>
                        <a v-if="item._id == 'CNBlog'" :href="item.link" target="_blank" class="news-article">
							<div class="vertical-aligner">
								<div class="image">
									<img style="height: 150px;" src='../../assets/cnBlog.jpg' alt="">
								</div>
								<div class="desc">
									<hgroup>
										<h3>
                                            <span>{{item.time | DateTransform}}</span>
                                            <span class="m_l_20">作者：{{item.author}}</span>
                                        </h3>
										<h4>{{item.title}}</h4>
									</hgroup>
									<p class="description">
										{{item.summary}}
									</p>
									<p class="link">Read More</p>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
            <div class="load-more">
                <div class="loadBox">Load More</div>
            </div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "blog",
		data() {
			return {
				blogList: []
			}
			
		},
		mounted() {
            let _this = this
            let getContent = function() {
                return new Promise((resolve, reject) => {
                    _this.$http.get('/api/api/account/getContent').then(response => {
                        _this.blogList = response.data;
                        if(response.data.length%6 || response.data.length==0) {
                            resolve(6-response.data.length%6)
                        }else{
                            reject()
                        }
                    })        
                })
            }
            getContent().then((length) => {
                _this.$http.get('/api/api/getCNBlog').then(response => {
                    let CNBlogList = response.data.data.feed.entry;
                    for(let i=0;i<length;i++) {
                        _this.blogList.push({
                            _id: 'CNBlog',
                            title: CNBlogList[i].title[0]._,
                            author: CNBlogList[i].author[0].name[0],
                            summary: CNBlogList[i].summary[0]._,
                            link: CNBlogList[i].link[0].$.href,
                            image: 'String',
                            time: CNBlogList[i].updated[0]
                        })
                    }
                })
            })
		}
	}
</script>

<style>
.m_l_20{
    margin-left: 20px;
}
.detail .category-box {
    text-align: center;
    margin-bottom: 60px;
}

.detail .category-box h3 {
    font-size: 22px;
    border: 4px solid black;
    padding: 24px 100px;
    margin: 0;
    width: auto;
    display: inline-block;
    max-width: 600px;
    position: relative;
}

.detail .category-box h3:before {
    content: '';
    position: absolute;
    background: #000;
    width: 5px;
    height: 93px;
    top: -93px;
    left: 50%;
    margin-left: -2px;
}

.detail .category-box h3:after {
    content: '';
    position: absolute;
    background: #000;
    width: 5px;
    height: 65px;
    bottom: -65px;
    left: 50%;
    margin-left: -2px;
}

.detail .news-wrap {
    text-align: center;
	position: relative;
    margin: 0;
}

.news-wrap:before, .news-wrap:after {
    content: "";
    display: table;
}

.news-wrap:after {
    clear: both;
}

.detail .news-article-wrapper {
    float: left;
    margin-left: 0;
    margin-right: 0;
    width: 280px;
    margin: 0 40px 20px 80px;
    height: 420px;
    position: relative;
    text-align: left;
}
.detail .news-article-wrapper .news-article {
    float: left;
    margin-left: 0;
    margin-right: 0;
    width: 280px;
    font-size: 12px;
    position: relative;
    vertical-align: middle;
}
.detail .news-article-wrapper .news-article .vertical-aligner {
    display: table-cell;
    vertical-align: middle;
    height: 240px;
}
.detail .news-article-wrapper .news-article .image {
    margin: 0 0 10px 0;
    background-color: white;
    position: relative;
    z-index: 1000;
    min-height: 50px;
    min-width: 50px;
}
.detail .news-article-wrapper .news-article .description {
    max-height: 75px;
    overflow: hidden;
}
.detail .load-more{
    margin: 50px 0;
    float: left;
    width: 100%;
    position: relative;
}
.detail .load-more::before{
    content: '';
    position: absolute;
    background: #000;
    width: 5px;
    height: 410px;
    top: -370px;
    left: 400px;
    margin-left: -2px;
}
.detail .load-more .loadBox{
    position: relative;
    display: inline-block;
    width: 230px;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    border: 5px #000 solid;
    cursor: pointer;
    font-size: 1.25em;
    margin: 0 40px;
    font-family: "Microsoft Yahei";
    font-weight: bold;
    text-align: center;
}

.detail .load-more .loadBox::before{
    content: '';
    position: absolute;
    background: #000;
    width: 80px;
    height: 5px;
    left: -85px;
    top: 30px;
}

.image {
    width: 210px;
    height: 210px;
    background: #fff;
    border: 5px #000 solid;
    padding: 10px;
    display: inline-block;
    display: flex;
    align-items: center;
}
.image img {
    display: block;
	width: 180px;
    height: 180px;
}

h3 {
    font-family: 'Avenir LT W02 65 Medium',helvetica,sans-serif;
    font-weight: 500;
    font-size: 22px;
    line-height: 1.2;
    margin: 0 0 10px;
}

h4 {
    font-family: 'Avenir LT W02 65 Medium',helvetica,sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.2;
    margin: 0 0 10px;
}

.detail .news-article-wrapper .news-article h3 {
    margin: 0 0 5px;
    font-size: 1em;
}
.detail .news-article-wrapper .news-article h4 {
    margin: 0 0 10px;
    font-size: 1.35em;
}
.link {
    font-size: 13px;
    text-decoration: underline;
}
.link:hover{
	text-decoration: none;
}
/* 处理黑条框架 */
.detail .news-article-wrapper:nth-child(1n+1):after {
    content: '';
    position: absolute;
    background: #000;
    height: 5px;
    width: 400px;
    top: 117px;
    position: absolute;
    left: 0;
}
.detail .news-article-wrapper:nth-child(3n+3):after {
    display: none;
}
.detail .news-article-wrapper:nth-child(6n+4) .line-down:after {
    content: '';
    position: absolute;
    background: #000;
    width: 5px;
    height: 440px;
    right: -445px;
    top: -320px;
    position: absolute;
}
.detail .news-article-wrapper:nth-child(6n+7) .line-down:after {
    content: '';
    position: absolute;
    background: #000;
    width: 5px;
    height: 440px;
    right: -45px;
    top: -320px;
    position: absolute;
}
</style>
