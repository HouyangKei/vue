<template>
  <div class="user">
    <img alt="Vue logo" :src="`${publicPath}images/logo.png`" />
    <msg v-on:getMsgClcik="getMsg"></msg>
    <returnnav></returnnav>
    <strong></strong>
  </div>
</template>

<script>
// @ is an alias to /src
import msg from "@/components/msg.vue";
import returnnav from "@/components/returnnav.vue";
export default {
  name: "user",
  data:function () {
	      return  {
	     		publicPath: process.env.BASE_URL
	      }
	    },
  components: {
  	msg,returnnav
  },
  methods:{
    getMsg: function (msg) {
      alert(msg)
    }
  }
};
</script>
