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
		this.playerCount = 0;
	}
	// creates a new sequence and resets model variables
	Model.prototype.startGame = function(options){
		this.simonSequence = [];
		this.simonCount = 0;
		this.playerCount = 0;
				
	};



	


	window.app = window.app || {};
	window.app.Model = Model;
})(window);