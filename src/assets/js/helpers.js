(function (window) {
	'use strict';
	// addEventListener
	window.$on = function (target, type, callback) {
	  target.addEventListener(type, callback, false);
	}
	// get element by id
	window.$id = function(selector){
		return document.getElementById(selector);
	};
	// Get element(s) by CSS selector:
	window.$qs = function (selector) {
		return document.querySelector(selector);
	};
	// Get all elements
	window.$qsa = function (selectors) {
		return document.querySelectorAll(selectors);
	};
	// Check if element has class
	window.$hasClass = function(elem,className){
		return (" " + elem.className + " " ).indexOf( " " + className + " " ) > -1;
	};
	// Add class to existing element
	window.$addClass = function(elem, className){
		elem.classList.add(className);
	};
	// Remove class from existing element
	window.$removeClass = function(elem, className){
		elem.classList.remove(className);
	};
	// Toggle DOM element
	window.$toggleClass = function(elem, oldClassName,newClassName){
		$removeClass(elem,oldClassName);
		$addClass(elem,newClassName);
	};
	// Get random number between min and max
	window.$rand = function(min,max){
		return Math.floor(Math.random() * max) + min;
	};
	// Convert from number to char
	window.$fromIntToChar = function(num){
		switch(num){
			case 1: return 'btn-g';break;
			case 2: return 'btn-r';break;
			case 3: return 'btn-y';break;
			case 4: return 'btn-b';break;
		}
	};
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);




