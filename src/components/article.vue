<template>
  <span>hello{{ $route.params.articleId }}</span>
</template>

<script>
export default {
  name: 'artcle',
  mounted() {
    let url = "/api/api/account/getContent?_id=" + this.$route.params.articleId;
    this.$http.get(url).then(response => {
				console.log(response)
				this.blogList = response.data
			})
  }
}
</script>
