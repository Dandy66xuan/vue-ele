//pash common.js
const path = require('path')
// console.log('项目的绝对路径==>',__dirname)
// console.log('项目中某个组件额绝对路径==>',path.resolve(__dirname,'./src/components'))

module.exports  = {
    lintOnSave:false, //是否开启语法检测
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true, 
		// 开启 CSS source maps?
		sourceMap: true,
		// css预设器配置项
		loaderOptions: {
			scss: {
				prependData: `@import "./src/styles/main.scss";`
			}
		},
    },
    
    //配置目录别名
        configureWebpack: (config) => {
            config.resolve = {
                extensions:['.js','.vue','.json'],
                alias:{
                    '@':path.resolve(__dirname,'./src'),
                    "@c":path.resolve(__dirname,'./src/components'),
                    "@a":path.resolve(__dirname,'./src/assets'),
                    "@p":path.resolve(__dirname,'./src/public'),//获取绝对路径
                    vue$:"vue/dist/vue.esm.js"
                    
                }
            }
        },
    
    }