<template>
	<p>{{currentData}}</p>
</template>

<script>
export default {
  name: 'next',
  props: ['options'],
  data() {
    return {
      currentData: '',
      finalData: [],
      fullData: [`
A single backtick
      `,'test2','helloWorld'],
      interval: 200,
      showChoice: false,
      options: ['>那是什么', '>这是什么'],
      result: [],
      showFlag: false
    };
  },
  created() {
    this.makeResume();
  },
  methods: {
    makeResume: async function () {
      await this.progressivelyShowData(0)
      await this.progressivelyShowData(1)
      await this.showHtml()
    },
    progressivelyShowData(n) {
      let interval = this.interval;
      return new Promise((resolve, reject) => {
        console.log(resolve)
        let interval = this.interval;
        let showData = (async function() {
          let data = this.fullData[n];
          if(!data){return}
          let length = this.fullData.filter((_,index) => index <= n).map((item) => item.length).reduce((x, y) => x + y, 0);
          let prefixLength = length - data.length;
          if(this.currentData.length < length) {
            let l = this.currentData.length - prefixLength;
            let char = data.substring(l, l + 1) || ' '
            if(data.substring(l, l + 1) == '<') {
              this.currentData += data.substring(l).match(/^<\/br>/g)[0]
            } else{
              this.currentData += char
            }
            
            setTimeout(showData, interval)
          } else{
            resolve()
          }
        }).bind(this)
        showData();
      })
    },
  }
};
</script>