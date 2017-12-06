<template>
	<div class="choice">
		<div v-for="option in options">
			<p @click="makeResume()">{{option}}</p>
		</div >
	</div >
</template>

<script>
export default {
  name: 'choice',
  props: ['options'],
  methods: {
  	makeResume: function() {
  		console.log(this.$parent.showFlag)
  		this.$parent.showFlag = true;
  	}
  }
};
</script>

<style>
	.choice{
		position: fixed;
		bottom: 0;
	}
</style>