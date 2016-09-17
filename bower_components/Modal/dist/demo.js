/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var ModalFactory = __webpack_require__(1);

	var btnStyle = {
	    margin: '1em auto',
	    padding: '1em 2em',
	    outline: 'none',
	    fontSize: 16,
	    fontWeight: '600',
	    background: '#C94E50',
	    color: '#FFFFFF',
	    border: 'none'
	};

	var containerStyle = {
	    padding: '2em',
	    textAlign: 'center'
	};

	var APP = React.createClass({displayName: "APP",

	    toggleDialog: function(ref){

	        return function(){
	            this.refs[ref].toggle();
	        }.bind(this)
	    },

	    getContent: function(ref){
	        return (
	            React.createElement("div", {style: containerStyle}, 
	                React.createElement("h2", {style: {margin: 0, color: '#C94E50', fontWeight: 400}}), 
	                React.createElement("button", {style: btnStyle, onClick: this.toggleDialog(ref)}, "关闭")
	            )
	        );
	    },

	    getTiggerAndModal: function(ref, index){
	        var Modal = ModalFactory[ref];
	        return  (
	            React.createElement("div", {key: 'modal_'+index}, 
	                React.createElement("button", {style: btnStyle, onClick: this.toggleDialog(ref)}, "Open ", ref), 
	                React.createElement(Modal, {ref: ref, className: "modal"}, this.getContent(ref))
	            )
	        );
	    },

	    render: function() {
	        var self = this;
	        return (
	            React.createElement("div", null, 
	                ['DropModal','LeftModal','ScaleModal','WaveModal'].map(function(name, ind){
	                    return self.getTiggerAndModal(name, ind);
	                })
	            )
	        );
	    }
	});
	ReactDOM.render(React.createElement(APP, null), document.getElementById('AppContainer'));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    DropModal: __webpack_require__(2),
	    LeftModal: __webpack_require__(3),
	    ScaleModal: __webpack_require__(4),
	    WaveModal: __webpack_require__(5)
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var modalFactory = __webpack_require__(6);
	var insertKeyframesRule = __webpack_require__(7);
	var appendVendorPrefix = __webpack_require__(8);

	var animation = {
	    show: {
	        animationDuration: '0.4s',
	        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
	    },

	    hide: {
	        animationDuration: '0.4s',
	        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
	    },

	    showModalAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0,
	            transform: 'translate3d(-50%, -300px, 0)'
	        },
	        '100%': {
	            opacity: 1,
	            transform: 'translate3d(-50%, -50%, 0)'
	        }
	    }),

	    hideModalAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 1,
	            transform: 'translate3d(-50%, -50%, 0)'
	        },
	        '100%': {
	            opacity: 0,
	            transform: 'translate3d(-50%, 100px, 0)'
	        }
	    })
	};

	var showAnimation = animation.show;
	var hideAnimation = animation.hide;
	var showModalAnimation = animation.showModalAnimation;
	var hideModalAnimation = animation.hideModalAnimation;

	module.exports = modalFactory({

	    show : showAnimation,
	    hide : hideAnimation,

	    getRef: function(willHidden) {
	        return 'modal';
	    },

	    getModalStyle: function(willHidden) {
	        return appendVendorPrefix({
	            position: "fixed",
	            width: "500px",
	            transform: "translate3d(-300px, -50%, 0)",
	            top: "50%",
	            left: "50%",
	            backgroundColor: "white",
	            zIndex: 1050,
	            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
	            animationFillMode: 'forwards',
	            animationName: willHidden ? hideModalAnimation : showModalAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        })
	    },
	   
	    getContentStyle: function(willHidden) {
	        return appendVendorPrefix({
	            margin: 0
	        });
	    }
	});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var modalFactory = __webpack_require__(6);
	var insertKeyframesRule = __webpack_require__(7);
	var appendVendorPrefix = __webpack_require__(8);

	var animation = {
	    show: {
	        animationDuration: '0.4s',
	        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
	    },

	    hide: {
	        animationDuration: '0.4s',
	        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
	    },

	    showModalAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0,
	            transform: 'translate3d(-1500px, -50%, 0)'
	        },
	        '100%': {
	            opacity: 1,
	            transform: 'translate3d(-50%, -50%, 0)'
	        }
	    }),

	    hideModalAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 1,
	            transform: 'translate3d(-50%, -50%, 0)'
	        },
	        '100%': {
	            opacity: 0,
	            transform: 'translate3d(100px, -50%, 0)'
	        }
	    })
	};

	var showAnimation = animation.show;
	var hideAnimation = animation.hide;
	var showModalAnimation = animation.showModalAnimation;
	var hideModalAnimation = animation.hideModalAnimation;

	module.exports = modalFactory({

	    show : showAnimation,
	    hide : hideAnimation,

	    getRef: function(willHidden) {
	        return 'modal';
	    },

	    getModalStyle: function(willHidden) {
	        return appendVendorPrefix({
	            position: "fixed",
	            width: "500px",
	            transform: "translate3d(-50%, -50%, 0)",
	            top: "50%",
	            left: "50%",
	            backgroundColor: "white",
	            zIndex: 1050,
	            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
	            animationFillMode: 'forwards',
	            animationName: willHidden ? hideModalAnimation : showModalAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        })
	    },
	   
	    getContentStyle: function(willHidden) {
	        return appendVendorPrefix({
	            margin: 0
	        });
	    }
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var modalFactory = __webpack_require__(6);
	var insertKeyframesRule = __webpack_require__(7);
	var appendVendorPrefix = __webpack_require__(8);

	var animation = {
	    show: {
	        animationDuration: '0.4s',
	        animationTimingFunction: 'cubic-bezier(0.6,0,0.4,1)'
	    },
	    hide: {
	        animationDuration: '0.4s',
	        animationTimingFunction: 'ease-out'
	    },
	    showContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0,
	            transform: 'scale3d(0, 0, 1)'
	        },
	        '100%': {
	            opacity: 1,
	            transform: 'scale3d(1, 1, 1)'
	        }
	    }),

	    hideContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 1
	        },
	        '100%': {
	            opacity: 0,
	            transform: 'scale3d(0.5, 0.5, 1)'
	        }
	    })
	};

	var showAnimation = animation.show;
	var hideAnimation = animation.hide;
	var showContentAnimation = animation.showContentAnimation;
	var hideContentAnimation = animation.hideContentAnimation;

	module.exports = modalFactory({
	    show: showAnimation,
	    hide: hideAnimation,
	    getRef: function(willHidden) {
	        return 'content';
	    },
	    getModalStyle: function(willHidden) {
	        return appendVendorPrefix({
	            zIndex: 1050,
	            position: "fixed",
	            width: "500px",
	            transform: "translate3d(-50%, -50%, 0)",
	            top: "50%",
	            left: "50%"
	        });
	    },
	    getContentStyle: function(willHidden) {
	        return appendVendorPrefix({
	            margin: 0,
	            backgroundColor: "white",
	            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
	            animationFillMode: 'forwards',
	            animationName: willHidden ? hideContentAnimation : showContentAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        });
	    }
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 这里的样式是网上抄来的，觉得挺有意思就加进来了
	var modalFactory = __webpack_require__(6);
	var insertKeyframesRule = __webpack_require__(7);
	var appendVendorPrefix = __webpack_require__(8);

	var animation = {
	    show: {
	        animationDuration: '1s',
	        animationTimingFunction: 'linear'
	    },
	    hide: {
	        animationDuration: '0.3s',
	        animationTimingFunction: 'ease-out'
	    },
	    showContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0,
	            transform: 'matrix3d(0.7, 0, 0, 0, 0, 0.7, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '2.083333%': {
	            transform: 'matrix3d(0.75266, 0, 0, 0, 0, 0.76342, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '4.166667%': {
	            transform: 'matrix3d(0.81071, 0, 0, 0, 0, 0.84545, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '6.25%': {
	            transform: 'matrix3d(0.86808, 0, 0, 0, 0, 0.9286, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '8.333333%': {
	            transform: 'matrix3d(0.92038, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '10.416667%': {
	            transform: 'matrix3d(0.96482, 0, 0, 0, 0, 1.05202, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '12.5%': {
	            transform: 'matrix3d(1, 0, 0, 0, 0, 1.08204, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '14.583333%': {
	            transform: 'matrix3d(1.02563, 0, 0, 0, 0, 1.09149, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '16.666667%': {
	            transform: 'matrix3d(1.04227, 0, 0, 0, 0, 1.08453, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '18.75%': {
	            transform: 'matrix3d(1.05102, 0, 0, 0, 0, 1.06666, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '20.833333%': {
	            transform: 'matrix3d(1.05334, 0, 0, 0, 0, 1.04355, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '22.916667%': {
	            transform: 'matrix3d(1.05078, 0, 0, 0, 0, 1.02012, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '25%': {
	            transform: 'matrix3d(1.04487, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '27.083333%': {
	            transform: 'matrix3d(1.03699, 0, 0, 0, 0, 0.98534, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '29.166667%': {
	            transform: 'matrix3d(1.02831, 0, 0, 0, 0, 0.97688, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '31.25%': {
	            transform: 'matrix3d(1.01973, 0, 0, 0, 0, 0.97422, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '33.333333%': {
	            transform: 'matrix3d(1.01191, 0, 0, 0, 0, 0.97618, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '35.416667%': {
	            transform: 'matrix3d(1.00526, 0, 0, 0, 0, 0.98122, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '37.5%': {
	            transform: 'matrix3d(1, 0, 0, 0, 0, 0.98773, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '39.583333%': {
	            transform: 'matrix3d(0.99617, 0, 0, 0, 0, 0.99433, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '41.666667%': {
	            transform: 'matrix3d(0.99368, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '43.75%': {
	            transform: 'matrix3d(0.99237, 0, 0, 0, 0, 1.00413, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '45.833333%': {
	            transform: 'matrix3d(0.99202, 0, 0, 0, 0, 1.00651, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '47.916667%': {
	            transform: 'matrix3d(0.99241, 0, 0, 0, 0, 1.00726, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '50%': {
	            opacity: 1,
	            transform: 'matrix3d(0.99329, 0, 0, 0, 0, 1.00671, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '52.083333%': {
	            transform: 'matrix3d(0.99447, 0, 0, 0, 0, 1.00529, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '54.166667%': {
	            transform: 'matrix3d(0.99577, 0, 0, 0, 0, 1.00346, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '56.25%': {
	            transform: 'matrix3d(0.99705, 0, 0, 0, 0, 1.0016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '58.333333%': {
	            transform: 'matrix3d(0.99822, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '60.416667%': {
	            transform: 'matrix3d(0.99921, 0, 0, 0, 0, 0.99884, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '62.5%': {
	            transform: 'matrix3d(1, 0, 0, 0, 0, 0.99816, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '64.583333%': {
	            transform: 'matrix3d(1.00057, 0, 0, 0, 0, 0.99795, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '66.666667%': {
	            transform: 'matrix3d(1.00095, 0, 0, 0, 0, 0.99811, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '68.75%': {
	            transform: 'matrix3d(1.00114, 0, 0, 0, 0, 0.99851, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '70.833333%': {
	            transform: 'matrix3d(1.00119, 0, 0, 0, 0, 0.99903, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '72.916667%': {
	            transform: 'matrix3d(1.00114, 0, 0, 0, 0, 0.99955, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '75%': {
	            transform: 'matrix3d(1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '77.083333%': {
	            transform: 'matrix3d(1.00083, 0, 0, 0, 0, 1.00033, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '79.166667%': {
	            transform: 'matrix3d(1.00063, 0, 0, 0, 0, 1.00052, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '81.25%': {
	            transform: 'matrix3d(1.00044, 0, 0, 0, 0, 1.00058, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '83.333333%': {
	            transform: 'matrix3d(1.00027, 0, 0, 0, 0, 1.00053, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '85.416667%': {
	            transform: 'matrix3d(1.00012, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '87.5%': {
	            transform: 'matrix3d(1, 0, 0, 0, 0, 1.00027, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '89.583333%': {
	            transform: 'matrix3d(0.99991, 0, 0, 0, 0, 1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '91.666667%': {
	            transform: 'matrix3d(0.99986, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '93.75%': {
	            transform: 'matrix3d(0.99983, 0, 0, 0, 0, 0.99991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '95.833333%': {
	            transform: 'matrix3d(0.99982, 0, 0, 0, 0, 0.99985, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '97.916667%': {
	            transform: 'matrix3d(0.99983, 0, 0, 0, 0, 0.99984, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '100%': {
	            opacity: 1,
	            transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        }
	    }),

	    hideContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 1
	        },
	        '100%': {
	            opacity: 0,
	            transform: 'scale3d(0.8, 0.8, 1)'
	        },
	    })
	};

	var showAnimation = animation.show;
	var hideAnimation = animation.hide;
	var showContentAnimation = animation.showContentAnimation;
	var hideContentAnimation = animation.hideContentAnimation;

	module.exports = modalFactory({
	    show : showAnimation,
	    hide : hideAnimation,

	    getRef: function(willHidden) {
	        return 'content';
	    },
	    getModalStyle: function(willHidden) {
	        return appendVendorPrefix({
	            zIndex: 1050,
	            position: "fixed",
	            width: "500px",
	            transform: "translate3d(-50%, -50%, 0)",
	            top: "50%",
	            left: "50%"
	        });
	    },
	    
	    getContentStyle: function(willHidden) {
	        return appendVendorPrefix({
	            margin: 0,
	            backgroundColor: "white",
	            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
	            animationFillMode: 'forwards',
	            animationName: willHidden ? hideContentAnimation : showContentAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        });
	    }
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var transitionEvents = __webpack_require__(9);
	var insertKeyframesRule = __webpack_require__(7);
	var appendVendorPrefix = __webpack_require__(8);

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
	            var backdrop = this.props.backdrop? React.createElement("div", {onClick: this.hide, style: backdropStyle}): undefined;
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

	            return (React.createElement("span", null, 
	                React.createElement("div", {ref: "modal", style: modalStyle, className: this.props.className}, 
	                    sharp, 
	                    React.createElement("div", {ref: "content", tabIndex: "-1", style: contentStyle}, 
	                        this.props.children
	                    )
	                ), 
	                backdrop
	             ));
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var insertRule = __webpack_require__(10);
	var vendorPrefix = __webpack_require__(11)();
	var index = 0;

	module.exports = function(keyframes) {
	  // random name
	  var name = 'anim_' + (++index) + (+new Date);
	  var css = "@" + vendorPrefix + "keyframes " + name + " {";

	  for (var key in keyframes) {
	    css += key + " {";

	    for (var property in keyframes[key]) {
	      var part = ":" + keyframes[key][property] + ";";
	      // We do vendor prefix for every property
	      css += vendorPrefix + property + part;
	      css += property + part;
	    }

	    css += "}";
	  }

	  css += "}";

	  insertRule(css);

	  return name
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getVendorPropertyName = __webpack_require__(12);

	module.exports = function(target, sources) {
	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  var prefixed = {};
	  for (var key in to) {
	    prefixed[getVendorPropertyName(key)] = to[key]
	  }

	  return prefixed
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },

	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};

	var endEvents = [];

	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;

	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }

	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }

	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}

	if (typeof window !== 'undefined') {
	  detectEvents();
	}


	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.

	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}

	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}

	module.exports = {
	  addEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },

	  removeEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var extraSheet;

	module.exports = function(css) {

	  if (!extraSheet) {
	    // First time, create an extra stylesheet for adding rules
	    extraSheet = document.createElement('style');
	    document.getElementsByTagName('head')[0].appendChild(extraSheet);
	    // Keep reference to actual StyleSheet object (`styleSheet` for IE < 9)
	    extraSheet = extraSheet.sheet || extraSheet.styleSheet;
	  }

	  var index = (extraSheet.cssRules || extraSheet.rules).length;
	  extraSheet.insertRule(css, index);

	  return extraSheet;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cssVendorPrefix;

	module.exports = function() {

	  if (cssVendorPrefix) return cssVendorPrefix;

	  var styles = window.getComputedStyle(document.documentElement, '');
	  var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];

	  return cssVendorPrefix = '-' + pre + '-';
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var builtinStyle = __webpack_require__(13);
	var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
	var domVendorPrefix;

	// 2009 spec only
	var flexbox = {
	  flex: ['WebkitFlex', 'WebkitBoxFlex'],
	  order: ['WebkitOrder','WebkitBoxOrdinalGroup'],
	  // https://github.com/postcss/autoprefixer/blob/master/lib/hacks/flex-direction.coffee
	  flexDirection: ['WebkitFlexDirection', 'WebkitBoxOrient', 'WebkitBoxDirection'],
	  // https://github.com/postcss/autoprefixer/blob/master/lib/hacks/align-items.coffee
	  alignItems: ['WebkitAlignItems', 'WebkitBoxAlign'],
	  // https://github.com/postcss/autoprefixer/blob/master/lib/hacks/justify-content.coffee
	  justifyContent: ['WebkitJustifyContent', 'WebkitBoxPack'],
	  flexWrap: ['WebkitFlexWrap'],
	  alignSelf: ['WebkitAlignSelf'],
	}

	// Helper function to get the proper vendor property name. (transition => WebkitTransition)
	module.exports = function(prop, isSupportTest) {

	  var vendorProp;
	  if (prop in builtinStyle) return prop;

	  if(flexbox[prop]){
	    // TODO: cache the result
	    var flexProperties = flexbox[prop];
	    for (var i = 0; i < flexProperties.length; ++i) {
	      if (flexProperties[i] in builtinStyle) {
	        return flexProperties[i];
	      }
	    }

	  }else{

	    var UpperProp = prop.charAt(0).toUpperCase() + prop.substr(1);

	    if (domVendorPrefix) {

	      vendorProp = domVendorPrefix + UpperProp;
	      if (vendorProp in builtinStyle) {
	        return vendorProp;
	      }
	    } else {

	      for (var i = 0; i < prefixes.length; ++i) {
	        vendorProp = prefixes[i] + UpperProp;
	        if (vendorProp in builtinStyle) {
	          domVendorPrefix = prefixes[i];
	          return vendorProp;
	        }
	      }
	    }
	  }

	  // if support test, not fallback to origin prop name
	  if (!isSupportTest) {
	    return prop;
	  }

	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = document.createElement('div').style;


/***/ }
/******/ ])