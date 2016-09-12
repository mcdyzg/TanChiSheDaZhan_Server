/**
 * Author: liwenqiang
 * Date: 15-10-12 下午9:44
 */
module.exports=function(root){
    return {
        //数据库连接
        // mongo:'mongodb://acount:pwd@url:27017/db',
        mongo: 'mongodb://bigscript:Mzlc123456@120.27.193.132:27017/bigscript',
        // mysql: {
        //     host: '10.9.63.133',
        //     port: '3306',
        //     user: 'youni_oa',
        //     password: '5Tapw5uEqPKzKfMc',
        //     database: 'youren'
        // },
        //系统目录
        model:root+'/models/',
        action:root+'/actions/',
        view : root+'/views/',
        game : root+'/games/',
        logger_path: root+'/logs/error.log',
        logger_level: 'debug',
        //cookie session
        maxAge: 259200000,
        secret:'*&$^*&(*&$%@#@#$@!#$@%((()*()^#$%$#%@#$%@#$%$#',
        //端口设置
        port:3030,
        needAuth : false
    }

}
