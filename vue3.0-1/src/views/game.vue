<template>
  <div class="game">
    <pmd></pmd>
    <button v-on:click="axiosDemo">请求api测试</button>
  </div>
</template>

<script>
// @ is an alias to /src
import pmd from "@/components/pmd.vue";

export default {
  name: "game",
  components: {
  	pmd
  },
  methods:{
			axiosDemo:function(){	
				axios.get('/hy/lottery/vueTest.do').then(res => {
				  alert(res)
				})
			}
  }
};
</script>
