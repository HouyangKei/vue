<template>
  <div class="home">
    <img alt="Vue logo"  :src="`${publicPath}images/logo.png`"/>
    <img alt="title" src="~/@/assets/img/back.jpg" />
    <translateForm v-on:formSubmit="say('what')"></translateForm>
    <msg v-on:getMsgClcik="getMsg"></msg>
  </div>
</template>

<script>
// @ is an alias to /src
import translateForm from "@/components/translateForm.vue";
import msg from "@/components/msg.vue";

export default {
  name: "home",
  data () {
	  return {
	    publicPath: process.env.BASE_URL
	  }
	},
  components: {
  	translateForm,msg
  },
  methods:{
     say: function (message) {
      alert(message)
    },
    getMsg: function (msg) {
      alert(msg)
    }
  }
};
</script>
<style  lang="scss">
	$color : red;
	button {
  	color: $color;
	}
	img{
		width: 50%;
	}
</style>