<template>
	<div class="app-index">
		<transition name="router-fade" mode="out-in">
    		<router-view></router-view>
    	</transition>
    </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  }
}
</script>

<style>

body, table, input {
    font-family: "Microsoft Yahei";
    font-weight: 400;
    line-height: 1.5;
    font-size: 14px;
    color: #000;
}
.app-index {
  font-family: Helvetica, sans-serif;
  height: 100%;
  width: 100%;
}
*{
  margin: 0;
}
a {
    color: #000;
    text-decoration: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
