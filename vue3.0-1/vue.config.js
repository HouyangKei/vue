const webpack = require('webpack')
const baseUrl = process.env.NODE_ENV === 'production'? '/pmdDemo/': '/'
module.exports = {
	publicPath: baseUrl,
  	outputDir: 'pmdDemo',
  	css: {
	     // 是否使用css分离插件 ExtractTextPlugin
  		extract: true
	},
	//后端 API 服务器
	devServer: {
	    proxy: {
	      '/hy': {
	        target: process.env.VUE_APP_URL,
	        ws: true,
	        changeOrigin: true,
	        pathRewrite: {
	          '^/hy': ''
	        }
	      },
	      '/douban': {
	        target: 'https://api.douban.com/v2/movie/',
	        ws: true,
	        changeOrigin: true,
	        pathRewrite: {
	          '^/douban': ''
	        }
	      }
	    }
 	},
 	//引入jquery插件
	configureWebpack: {
	    plugins: [
	        new webpack.ProvidePlugin({
	            $:"jquery",
	            jQuery:"jquery",
	            "windows.jQuery":"jquery"
	        })
	    ]
	},
	//scss 全局变量
	css: {
	    loaderOptions: {
	      sass: {
	        prependData: `$baseUrl: "${baseUrl}";`
	    	}
	    }
  	},
  	pages: {
	    index: {
	      // page 的入口
	      entry: 'src/assets/main.js',
	      // 模板来源   
	      template: 'public/page/index.html',
	      // 在 dist/index.html 的输出
	      filename: 'index.html',
	      // 当使用 title 选项时，
	      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
	      title: 'Index Page',
	      // 在这个页面中包含的块，默认情况下会包含
	      // 提取出来的通用 chunk 和 vendor chunk。
	      chunks: ['chunk-vendors', 'index']
	    }
  	},
  	 // webpack配置
    chainWebpack: config => {
    	// 移除 prefetch 插件
        config.plugins.delete('prefetch-index')
        // 移除 preload 插件
        config.plugins.delete('preload-index');
        if (process.env.NODE_ENV === 'production') {
            // 清除css，js版本号
            config.output.filename('static/js/[name].js').end();
            config.output.chunkFilename('static/js/[name].js').end();
            // 为生产环境修改配置...
            config.plugin('extract-css').tap(args => [{
                    filename: `static/css/[name].css`,
                    chunkFilename: `static/css/[name].css`
                }])
        }
    }
}
console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_URL);