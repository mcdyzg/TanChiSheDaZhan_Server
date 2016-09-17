ReactModal
==========

modal的react实现，实现方式有很多种，这里主要是利用factory的方法生成动态的modal，后续朋友们可以根据已有的动态文件创建新的效果.

## 项目通用js引用说明

react项目的通用引用包cdn路径为
//miz-cdn.b0.upaiyun.com/miz-js-lib/miz-react.min.js
封装了 react-0.14.7.js ract-dom.0.14.7.js react-router-2.0.1.min.js
压缩版本，源码可以自己去下载来看

辅助js
//miz-cdn.b0.upaiyun.com/miz-js-lib/miz-js-base.min.js
包含了 zepto.min.js
      fastclick.js
      lodash.js
      q.js
      TapEffect.js
由于lodash可以根据方法分模块加载，在以后的版本中决定把lodash移除，需要使用自行在项目中require即可。

动画js使用的是green-sock
//miz-cdn.b0.upaiyun.com/miz-js-lib/green-sock.min.js
包含了tweenlit drag组件。至于green-sock的api请参考 [green-sock官网](http://greensock.com/)

## Modals类型

* DropModal
* LeftModal
* ScaleModal

## 依赖说明

本例依赖 react-kit
需要 cnpm isntall react-kit
你也可以把 react-kit 放到自己项目的package.json的依赖里面

## Demo

checkout code: [](http://)

and run:

```
npm install
gulp watch
```

有些时候国内npm源访问比较慢，那么推荐使用cnpm。建议使用nvm管理自己的node版本，建议使用较高版本的nodejs。

```
npm install cnpm -g
cnpm install -l
gulp watch
```

## Usage

```
var Modal = require('Modal').DropModal;
var Example = React.createClass({
    showModal: function(){
        this.refs.modal.show();
    },
    hideModal: function(){
        this.refs.modal.hide();
    },
    render: function() {
        return (
            <button onClick={this.showModal}>Open</button>
            <Modal ref="modal">
                <h2>I'm a dialog</h2>
                <button onClick={this.hideModal}>Close</button>
            </Modal>
        );
    }
});
```
