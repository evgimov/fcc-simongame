(function (window) {
	'use strict';
// addEventListener
window.$on = function (target, type, callback) {
  target.addEventListener(type, callback, false);
}

// Get element(s) by CSS selector:
window.$qs = function (selector, scope) {
	return (scope || document).querySelector(selector);
};
// Get all elements
window.$qsa = function (scope,selectors) {
	return document.querySelectorAll(selectors);
};




})(window);




