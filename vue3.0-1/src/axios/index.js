import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// 请求超时
axios.defaults.timeout = 5000 
//设置默认请求url
axios.defaults.baseURL = process.env.VUE_APP_URL

export default axios