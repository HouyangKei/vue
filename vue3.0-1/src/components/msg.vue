<template>
  <div id="msg">
      <input type="text" placeholder="输入内容" v-model="msg">
      <button v-on:click="getMsg">click 点击我</button>
  </div>
</template>

<script>
	export default {
    name: 'msg',
    data(){
        return {
          msg:"",
        }
    },
    methods:{
        getMsg:function(event){
          this.$emit("getMsgClcik",this.msg);  //注册事件,随便起名 
          event.preventDefault();
        }
    }
}
</script>
