<template>
  <div id="translateForm">
      <form v-on:submit="formSubmit">
        <input type="text" placeholder="输入需要翻译的内容" v-model="textToTranslate">
      </form>
  </div>
</template>

<script>
	
	export default {
    name: 'translateForm',
    data(){
        return {
          textToTranslate:"",
        }
    },
    methods:{
        formSubmit:function(event){
          this.$emit("formSubmit",this.textToTranslate);  //注册事件,随便起名 
          event.preventDefault();
        }
    }
}
</script>
