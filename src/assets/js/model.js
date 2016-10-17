(function (window){
	'use strict';

	/**
	* Creates a new Model instance 
		
	*/

	function Model(){
		this.MAXSEQUENCE = 20;
		this.simonSequence = [];
		this.simonCount = 0;
		this.strictMode = false;
	}

	


	window.app = window.app || {};
	window.app.Model = Model;
})(window);