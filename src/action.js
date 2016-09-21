module.exports = function(app, fs) {
    var router = app.use(require('koa-router')(app));
    var action_pre_name = C.action_pre_name || '/';
    var compose = require('koa-compose');
    var bodyParser = require('koa-body');
    //*******注册root
    router.get('/', function*(next) {
        // if (C.needAuth) {
        //
        // } else {
            this.body = yield this.render('index');
        // }
    });

    /**
     * 注入 init 函数
     * @param fn 原有方法
     * @param ctrl 全局方法 目前只支持 _init
     * @returns {*}
     * 增加其他全局 增加 执行数组 队列执行 ctrl.access [fn,fn] 根据由左到右执行
     */
    // 这个函数作用是把action里抽出的多个action文件，再转换成router('/**',function(){})的形式
    var _construct = function(fn, ctrl, controllerName, actionName) {
        var load_func = []

        load_func.push(function*(next) {
            this.controller_name = controllerName;
            this.action_name = actionName;
            yield next;
        });

        if (_.isArray(ctrl._access)) {
            _.forEach(ctrl._access, function(v, k) {
                var rs_func = _translate_access(v);
                load_func.push(rs_func);
            });
        }

        var _extend_common_cache = {};
        load_func.push(function*(next) {
            for (var i in ctrl._extend) {
                if (!_extend_common_cache[i]) {
                    _.extend(_extend_common_cache, ctrl._extend[i](this, i))
                }
                this[i] = _extend_common_cache;
            }
            yield next;
        });

        load_func.push(fn);
        return compose(load_func);
    }

    var _translate_access = function(name) {
        name = name.split('/')
        var func = require(C.access + name[0])[name[1]] || function*(next) {
            yield next;
        }
        return func;
    }

    //***************注册Controller
    // fs.readdirSync(C.action).forEach(function(name) {
    //     if (name.indexOf('.js') > -1) {
    //         var ctrl = require(C.action + name);
    //         name = name.replace('.js', '').toLowerCase();
    //         _.forEach(ctrl, function(v, k) {
    //             if (typeof v === 'function') {
    //                 var route_name = action_pre_name + name + '/' + k;
    //                 // console.log('===registe action ==>' + route_name);
    //                 router.all(route_name, _construct(v, ctrl, name, k));
    //             }
    //         });
    //     }
    // })
}
