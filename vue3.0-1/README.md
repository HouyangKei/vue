vue-cli使用手册
项目路径：https://github.com/HouyangKei/vue/tree/master/vue3.0-1
git下来的项目没有node_modules（没有库）
先cd到项目目录下，
然后用npm install npm重新安装库文件node_modules，
vue版本：@vue/cli 4.0.3

1：安装vue  
a：执行npm install -g @vue/cli
b：配置环境变量 D:\java\node-v10.14.1\node_global  （因为vue是全局安装的，设置过全局安装路径，这里环境变量路径为这个）
全局包放置路径设置
1查看node安装路径  ：where node
2查看全局包放置路径：npm root -g
3修改全局包放置路径
先查看安装路径
node安装目录下下新建两个文件夹
node_global 全局包下载存放
node_cache node缓存
npm config set prefix "D:\java\node-v10.14.1\node_global"

npm config set cache D:\java\node-v10.14.1\node_cache"

c：通过cmd 打开控制台输入vue查看是否安装成功
d：设置淘宝镜像代理：
npm config set registry=https://registry.npm.taobao.org
2：创建vue项目
a：通过vue ui 创建（图形界面）
b：vue create hello-world（cmd 命令）

3：启服务npm run serve
根据package.json文件


4：查看webpack 配置 
vue inspect > output.js  其输出重定向到一个文件以便进行查阅

5：本地预览
dist 目录需要启动一个 HTTP 服务器来访问 (除非你已经将 publicPath 配置为了一个相对的值)，所以以 file:// 协议直接打开 dist/index.html 是不会工作的。在本地预览生产环境构建最简单的方式就是使用一个 Node.js 静态文件服务器，例如 serve：
npm install -g serve
# -s 参数的意思是将其架设在 Single-Page Application 模式下
# 这个模式会处理即将提到的路由问题
serve -s dist

6：服务器访问
列如测试服务器，把整个目录放到服务器根目录下/usr/share/nginx/html

7：根据不同的环境设置不同的请求api路径
项目根目录下创建env文件
dev：开发环境 test：测试环境 prod：生产环境



只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中。你可以在应用的代码中这样访问它们：
console.log(process.env.VUE_APP_SECRET)
除了 VUE_APP_* 变量之外，在你的应用代码中始终可用的还有两个特殊的变量：
NODE_ENV - 会是 "development"、"production" 或 "test" 中的一个。具体的值取决于应用运行的模式。
BASE_URL - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径。
修改package.json文件

9：配置数据请求api服务器
如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
devServer.proxy 可以是一个指向开发环境 API 服务器的字符串：
module.exports = {
  devServer: {
    proxy: 'http://localhost:4000'
}
module.exports = {   devServer: {	    proxy: {	      '/hy': {	        target: process.env.VUE_APP_URL,	        ws: true,	        changeOrigin: true,	        pathRewrite: {	          '^/hy': ''	        }	      },	      '/douban': {	        target: 'https://api.douban.com/v2/movie/',	        ws: true,	        changeOrigin: true,	        pathRewrite: {	          '^/douban': ''	        }	      }	    } 	}}
使用axios请求数据
先安装需要的包
npm install axios
npm install vue-axios
创建js文件 导入插件


import Vue from 'vue'import axios from 'axios'import VueAxios from 'vue-axios'Vue.use(VueAxios, axios)  // 请求超时axios.defaults.timeout = 5000 //设置默认请求url（见问题15）axios.defaults.baseURL = process.env.VUE_APP_URLexport default axios
插件调用
axios.get('/hy/lottery/vueTest.do').then(res => {	alert(res)})
相当于我们请求了http://localhost:80/hy/lottery/vueTest.do



10：html页面引用组件
index.html  通过

引入组件  user.vue 在引入子组件


11：引用jquery插件
a：安装jquerynpm install jquery --save
b：配置vue.config.js文件  
//引入jquery插件	configureWebpack: {	    plugins: [	        new webpack.ProvidePlugin({	            $:"jquery",	            jQuery:"jquery",	            "windows.jQuery":"jquery"	        })	    ]	}

12：vue-router路由传参引起的问题解决（user/:id）id为参数
a：地址栏带有#
 设置mode为history new VueRouter({      mode: 'history',      routes:routes })vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。如果你在 history 模式下使用 Vue Router，是无法搭配简单的静态文件服务器的。例如，如果你使用 Vue Router 为 /todos/42/ 定义了一个路由，开发服务器已经配置了相应的 localhost:3000/todos/42 响应，但是一个为生产环境构建架设的简单的静态服务器会却会返回 404。为了解决这个问题，你需要配置生产环境服务器，将任何没有匹配到静态文件的请求回退到 index.html。Vue Router 的文档提供了常用服务器配置指引。

b：页面刷新报错
vue.config.js  修改publicPath，"./"或者"/"修改为项目名（修改为pmdDemo）

c：图片等静态资源找不到（上面修改过publicPath）
当静态资源放到public文件下，需要写绝对路径。因为上面修改过publicPath，所以项目不会部署服务器根目录下，部署到publicPath修过后的文件路径下。

这里图片路径写法如下：
组件：<img alt="Vue logo" :src="`${publicPath}images/logo.png`"/>"`"符号为字符串拼接js:export default {  data () {	  return {	    publicPath: process.env.BASE_URL	  }	}};由于开发环境和生产环境不一样，所以publicPath值应该根据环境的不同而不同。项目的 package.json：{  "scripts": {    "serve": "vue-cli-service serve",    "build": "vue-cli-service build"  }}serve起服务，指定环境模式 (默认值：development)build打包，指定环境模式 (默认值：production)根据不同的命令获取不同的process.env.BASE_URL值在vue.config.js  修改process.env.BASE_URL的值，方式如下const baseUrl = process.env.NODE_ENV === 'production'? '/pmdDemo/': '/'module.exports = {	publicPath: baseUrl}



任何放置在 public 文件夹的静态资源都会被简单的复制，而不经过 webpack。你需要通过绝对路径来引用它们。
注意我们推荐将资源作为你的模块依赖图的一部分导入，这样它们会通过 webpack 的处理并获得如下好处：
脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求。
文件丢失会直接在编译时报错，而不是到了用户端才产生 404 错误。
最终生成的文件名包含了内容哈希，因此你不必担心浏览器会缓存它们的老版本。
public 目录提供的是一个应急手段，当你通过绝对路径引用它时，留意应用将会部署到哪里。如果你的应用没有部署在域名的根部，那么你需要为你的 URL 配置 publicPath 前缀；

d：scss全局变量（根据不同的环境设置背景图片路径）
上面修改过publicPath后img图片路径可以 根据js来获取路径，css文件中背景图片用scss全局变量来设置路径       
 先安装scss依赖
 npm  install scss --save-dev
	npm  install scss-loader --save-dev
	npm  install sass-lodaer --save-dev
	npm  install node-sass --save-dev
修改vue.config.js
//scss 全局变量(支持变量和scss文件)
css: {	    loaderOptions: {	      sass: {	        prependData: `$baseUrl: "${baseUrl}";  @import "~@/assets/scss/variables.scss";`	    	}	    }  	}
	
${baseUrl}是const baseUrl = process.env.NODE_ENV === 'production'? '/pmdDemo/': '/'
如果 URL 是一个绝对路径 (例如 /images/foo.png)，它将会被保留不变。
如果 URL 以 . 开头，它会作为一个相对模块请求被解释且基于你的文件系统中的目录结构进行解析。
如果 URL 以 ~ 开头，其后的任何内容都会作为一个模块请求被解析。这意味着你甚至可以引用 Node 模块中的资源：
<img src="~some-npm-package/foo.png">

如果 URL 以 @ 开头，它也会作为一个模块请求被解析。它的用处在于 Vue CLI 默认会设置一个指向 <projectRoot>/src 的别名 @。(仅作用于模版中)

 模板中调用
设置lang：<style lang="scss">
图片路径为： background-image: url($baseUrl +'images/pmd/proBj.png');
或者
网上其他解决方案：以 ~ 开头，其后的任何内容都会作为一个模块请求被解析,但自己应用的时候好像并没有按照模块去解析... 暂且记录下
background-image: url('~/@/assets/images/logo.png')







遇到的问题
a：打包错误
Newline required at end of file but not found (eol-last) at    
页面格式问题最后一行必须多一行空白行（卸载验证引用包）
 b：服务器访问找不到js等文件页面引用资源路径不对
修改方式如下
项目根目录创建vue.config.js 
module.exports = {
	publicPath: './',
  	outputDir: 'dist'
}
注意：publicPath
Default: '/'
部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致，但是 Vue CLI 在一些其他地方也需要用到这个值，所以请始终使用 publicPath 而不要直接修改 webpack 的 output.publicPath。
默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中。
      c：Vue 错误提示 Do not use 'new' for side effects
在new Vue上加/* eslint-disable no-new */
这句注释可以绕过规则检测
e：解决vue在setTimeout内修改this失效的问题
当在vue中使用定时器来修改一个变量值的时候，发现没有效果，这是由于setTimeout函数调用的代码运行在与所在函数完全分离的执行环境上，这会使得this指向的是window对象。
（1）、使用箭头函数
this.luck.timer=setTimeout(() => {
this.pmdRoll(prizeIndex)
},500);
（2）、将当前对象的this保存为一个变量
