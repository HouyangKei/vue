import Vue from 'vue'
import App from '../App.vue'
import router from '../router'
import axios from '../axios'

new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')