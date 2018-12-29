let path = require('path');
let HWP = require('html-webpack-plugin');
let CWP = require('clean-webpack-plugin');
let OCAWP = require('optimize-css-assets-webpack-plugin'); //压缩css
let MCEP = require('mini-css-extract-plugin'); //分离css

let webpack = require('webpack');

module.exports = {
    mode:'development',//生产模式production  development
    //入口
    entry:{
        app:'./app.js'
    },
    //出口
    output:{
        //把东西放到build文件夹中   如果没有  就新建一个build文件
        path:path.resolve(__dirname,'build'),
        filename:'./js/[name].js'
    },
    module:{
        rules:[
            //css
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
                // use:[
                //     {
                //         loader:MCEP.loader,
                //     },
                //     'css-loader'
                // ]
            },
            //HTML
            {
                test:/\.html$/,
                use:'html-withimg-loader'
            },
            //IMG
            {
                test:/\.(jpg|png|gif|svg|ttf|bmp)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{

                            limit:4096,
                            publicPath:'./images',  //背景中url的路径
                            outputPath:'./images' //image路径   
                        }
                    }
                ]

            }
        ]
    },
    plugins:[
        //压缩css
        new OCAWP({}),
        //删除build文件
        new CWP(['build']),
        //html模板
        new HWP({
            template:'./index.html',
            filename:'./index.html',
            minify:{
                removeAttributeQuotes:true,
                collapseWhitespace:true
            }
        }),
        new MCEP({
            filename:'./css/[name].css'
        }),
        new webpack.HotModuleReplacementPlugin(),

    ],
    devServer:{
        // contentBase:path.resolve(__dirname,'build'),
        host:'localhost',
        compress:true,
        port:80,
        open:true,
        hot:true,
    }

    
}