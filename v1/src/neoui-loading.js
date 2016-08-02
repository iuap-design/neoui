/**
 * Module : neoui-loading
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 19:11:45
 */
import {BaseComponent} from './sparrow/BaseComponent';
import {addClass,removeClass,makeDOM} from './sparrow/dom';
import {env} from './sparrow/env';
import {compMgr} from './sparrow/compMgr';

var Loading = BaseComponent.extend({
	_Constant: {
		U_LOADING_LAYER_COUNT: 4
	},

	_CssClasses: {
		U_LOADING_LAYER: 'u-loading-layer',
		U_LOADING_CIRCLE_CLIPPER: 'u-loading-circle-clipper',
		U_LOADING_CIRCLE: 'u-loading-circle',
		U_LOADING_GAP_PATCH: 'u-loading-gap-patch',
		U_LOADING_LEFT: 'u-loading-left',
		U_LOADING_RIGHT: 'u-loading-right'
	},

	init: function() {
		if(env.isIE8 || env.isIE9) {
			var img = document.createElement('div');
			img.className = "loadingImg";
			this.element.appendChild(img);
		} else {
			for(var i = 1; i <= this._Constant.U_LOADING_LAYER_COUNT; i++) {
				this.createLayer(i);
			}
		}
		addClass(this.element, 'is-upgraded');

	},

	createLayer: function(index) {
		var layer = document.createElement('div');
		addClass(layer, this._CssClasses.U_LOADING_LAYER);
		addClass(layer, this._CssClasses.U_LOADING_LAYER + '-' + index);

		var leftClipper = document.createElement('div');
		addClass(leftClipper, this._CssClasses.U_LOADING_CIRCLE_CLIPPER);
		addClass(leftClipper, this._CssClasses.U_LOADING_LEFT);

		var gapPatch = document.createElement('div');
		addClass(gapPatch, this._CssClasses.U_LOADING_GAP_PATCH);

		var rightClipper = document.createElement('div');
		addClass(rightClipper, this._CssClasses.U_LOADING_CIRCLE_CLIPPER);
		addClass(rightClipper, this._CssClasses.U_LOADING_RIGHT)

		var circleOwners = [leftClipper, gapPatch, rightClipper];

		for(var i = 0; i < circleOwners.length; i++) {
			var circle = document.createElement('div');
			addClass(circle, this._CssClasses.U_LOADING_CIRCLE);
			circleOwners[i].appendChild(circle);
		}

		layer.appendChild(leftClipper);
		layer.appendChild(gapPatch);
		layer.appendChild(rightClipper);

		this.element.appendChild(layer);
	},

	stop: function() {
		removeClass(this.element, 'is-active');
	},

	start: function() {
		addClass(this.element, 'is-active');
	}

});

compMgr.regComp({
	comp: Loading,
	compAsString: 'u.Loading',
	css: 'u-loading'
});

var showLoading = function(op) {
	var htmlStr = '<div class="alert alert-waiting"><i class="uf uf-spinnerofdots"></i></div>';
	document.body.appendChild(makeDOM(htmlStr));
	htmlStr = '<div class="alert-backdrop" role="waiting-backdrop"></div>';
	document.body.appendChild(makeDOM(htmlStr));
}

var hideLoading = function() {
	var divs = document.querySelectorAll('.alert-waiting,.alert-backdrop');
	for(var i = 0; i < divs.length; i++) {
		document.body.removeChild(divs[i]);
	}
}

//兼容性保留
u.showWaiting = u.showLoading
u.removeWaiting = u.hideLoading

export {Loading,showLoading,hideLoading};
