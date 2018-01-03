<template>
    <div>
        <pc v-if="device == 'pc'"></pc>
        <mobile v-if="device == 'mobile'"></mobile>
    </div>
</template>

<script>

import mobile from './mobile.vue';
import pc from './pc.vue'

export default {
  name: 'resumeIndex',
  components: {
      mobile,
      pc
    },
  data() {
      return {
          device: ''
      }
  },
  mounted() {
    var width = document.documentElement.clientWidth
    this.device = width > 500 ? 'pc' : 'mobile'
    console.log(mobile)
  }
}
</script>

