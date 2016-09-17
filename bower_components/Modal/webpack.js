var webpack = require('webpack');
module.exports = {
    cache: false,
    entry: {
        components : './src/modal'
    },
    output: {
        // 这个path配置和pipe.dest()冲突
        // 所以如果使用"gulp watch" 此行要注释掉
        // 如果使用"webpack --watch" 此行要打开
        // path: './dist',
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'jsx-loader?harmony'}
        ]
    }
};
