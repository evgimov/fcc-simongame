(function (window) {
	'use strict';
// addEventListener
window.$on = function (target, type, callback) {
  target.addEventListener(type, callback, false);
}
// get element by id
window.$id = function(selector,scope){
	return (scope || document).getElementById(selector);
};
// Get element(s) by CSS selector:
window.$qs = function (selector, scope) {
	return (scope || document).querySelector(selector);
};
// Get all elements
window.$qsa = function (scope,selectors) {
	return document.querySelectorAll(selectors);
};
// if element has class
window.$hasClass = function(elem,className){
	return (" " + elem.className + " " ).indexOf( " " + className + " " ) > -1;
};

// Get random number between min and max
window.$rand = function(min,max){
	return Math.floor(Math.random() * max) + min;
};
// Convert from number to char
window.$fromIntToChar = function(num){
	switch(num){
		case 1: return 'g';break;
		case 2: return 'r';break;
		case 3: return 'y';break;
		case 4: return 'b';break;
	}
};



})(window);




