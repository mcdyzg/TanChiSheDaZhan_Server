var transitionEvents = require('react-kit/transitionEvents');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');
var appendVendorPrefix = require('react-kit/appendVendorPrefix');

module.exports = function(animation){

    return React.createClass({
        propTypes: {
            className: React.PropTypes.string,
            // 设置esc键是否可以关闭dialog.
            keyboard: React.PropTypes.bool,
            // 回调函数，show时候回调
            onShow: React.PropTypes.func,
            // 回调函数，hide时候回调
            onHide: React.PropTypes.func,
            //
            animation: React.PropTypes.object,
            // 是否需要modal的背景
            backdrop: React.PropTypes.oneOfType([
                React.PropTypes.bool,
                React.PropTypes.string
            ])
        },

        /**
         * @doc overview
         * @name getDefaultProps
         *
         * @returns {Object} -props object
         *  - `className` – `{string}` - calssName设置
         *  - `onShow` – `{function}` - show的时候的回调函数
         *  - `onHide` – `{function}` - hide的时候的回调函数
         *  - `animation` – `{object}` - 具体的动画效果对象
         *  - `keyboard` – `{boolean}` - 是否需要esc键隐藏modal
         *  - `backdrop` – `{boolean}` - 是否显示背景
         *
         * @description
         * 设置default props
         *
         */
        getDefaultProps: function() {
            return {
                className: "",
                onShow: function(){},
                onHide: function(){},
                animation: animation,
                keyboard: true,
                backdrop: true
            };
        },
        /**
         * @doc overview
         * @name getInitialState
         *
         * @returns {Object} -state object
         *  - `willHidden` – `{boolean}` - 要不要隐藏
         *  - `hidden` – `{boolean}` - 是否隐藏
         *
         * @description
         * 返回state数据对象
         *
         */
        getInitialState: function(){
            return {
                willHidden: false,
                hidden: true
            }
        },

        /**
         * @doc overview
         * @name hasHidden
         *
         * @returns -state object
         *  - `hidden` – `{boolean}` - 是否隐藏
         *
         * @description
         * 返回modal是否隐藏，通过这个字段来阻断dom的渲染
         *
         */
        hasHidden: function(){
            return this.state.hidden;
        },

        /**
         * @doc overview
         * @name componentDidMount
         *
         * @description
         * render之后执行，目的是在transition事件中添加监听
         *
         */
        componentDidMount: function(){
            var ref = this.props.animation.getRef();
            var node = this.refs[ref].getDOMNode();
            var endListener = function(e) {
                if (e && e.target !== node) {
                    return;
                }
                transitionEvents.removeEndEventListener(node, endListener);
                this.enter();
            }.bind(this);
            transitionEvents.addEndEventListener(node, endListener);
        },

        /**
         * @doc overview
         * @name showBackdropAnimation
         *
         * @description
         * 显示backdrop的动画样式
         *
         */
        showBackdropAnimation: insertKeyframesRule({
            '0%': {
                opacity: 0
            },
            '100%': {
                opacity: 0.9
            }
        }),

        /**
         * @doc overview
         * @name hideBackdropAnimation
         *
         * @description
         * 隐藏backdrop的动画样式
         *
         */
        hideBackdropAnimation: insertKeyframesRule({
            '0%': {
                opacity: 0.9
            },
            '100%': {
                opacity: 0
            }
        }),

        /**
         * @doc overview
         * @name getBackdropStyle
         *
         * @params
         * - willHidden - {boolean} - 区分是取显示的样式还是取消失的样式
         *
         * @description
         * 获取modal遮罩的样式，因为遮罩样式一般比较统一，不需要放到具体的实例去定义
         * 直接放到factory里面去定义好了。但是遮罩的一些动画属性还是跟着实例走，所以
         * 实例中需抛出 animation.show，animation.hide 对象
         *
         */
        getBackdropStyle: function(willHidden) {
            var self = this;

            return appendVendorPrefix({
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 1040,
                backgroundColor: "#373A47",
                animationDuration: '0.4s',
                animationFillMode: 'forwards',
                animationName: willHidden ? self.hideBackdropAnimation : self.showBackdropAnimation,
                animationTimingFunction: (willHidden ? animation.hide : animation.show).animationTimingFunction
            });
        },

        render: function() {
            // 判断是否是隐藏的modal，如果是就不需要进行render了。
            var hidden = this.hasHidden();
            if(hidden) return null;
            // 固话参数
            var willHidden = this.state.willHidden;
            var animation = this.props.animation;
            var modalStyle = animation.getModalStyle(willHidden);
            var backdropStyle = this.getBackdropStyle(willHidden);
            var contentStyle = animation.getContentStyle(willHidden);
            var ref = animation.getRef(willHidden);
            var sharp = animation.getSharp && animation.getSharp(willHidden);
            var backdrop = this.props.backdrop? <div onClick={this.hide} style={backdropStyle}/>: undefined;
            //
            if(willHidden) {
                var node = this.refs[ref].getDOMNode();
                var endListener = function(e) {
                    if (e && e.target !== node) {
                        return;
                    }
                    transitionEvents.removeEndEventListener(node, endListener);
                    this.leave();
                }.bind(this);
                transitionEvents.addEndEventListener(node, endListener);
            }

            return (<span>
                <div ref="modal" style={modalStyle} className={this.props.className}>
                    {sharp}
                    <div ref="content" tabIndex="-1" style={contentStyle}>
                        {this.props.children}
                    </div>
                </div>
                {backdrop}
             </span>);
        },
        // hide modal 回调
        leave: function(){
            this.setState({
                hidden: true
            });
            this.props.onHide();
        },
        // show modal回调
        enter: function(){
            this.props.onShow();
        },
        // 显示modal
        show: function(){
            if(!this.hasHidden()) return;

            this.setState({
                willHidden: false,
                hidden: false
            });
        },
        // 隐藏modal
        hide: function(){
            if(this.hasHidden()) return;

            this.setState({
                willHidden: true
            });
        },
        // hide show toggle
        toggle: function(){
            if(this.hasHidden())
                this.show();
            else
                this.hide();
        },
        // 监听esc按键，隐藏modal
        listenKeyboard: function(event) {
            if (this.props.keyboard &&
                    (event.key === "Escape" ||
                     event.keyCode === 27)) {
                this.hide();
            }
        },

        componentDidMount: function() {
            window.addEventListener("keydown", this.listenKeyboard, true);
        },

        componentWillUnmount: function() {
            window.removeEventListener("keydown", this.listenKeyboard, true);
        }

    });
}
