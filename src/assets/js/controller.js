(function (window){
	'use strict';

	/**
	 * Takes a model and view and acts as the controller between them
	 *
	 * @constructor
	 * @param {object} model The model instance
	 * @param {object} view The view instance
	 */
	function Controller(model, view){
		this.model = model;
		this.view = view;
	}

	Controller.prototype.initGame = function(){
		var self = this;
		this.model.startGame(null);
		this.view._disableGameButtons();
		this.view.setEventListener(function(id){
			self.buttonHandler(id);
		});
	};

	Controller.prototype.buttonHandler = function(id){
		if (id === 'start-btn'){
			this.startHandler();
		}else if (id === 'strict-btn'){
			this.strictHandler();
		}
	};

	Controller.prototype.startHandler = function(){
		this.model.setGameState();
		this.view.toggleStart();
		this.view.animateScreenMode('start');
		this.view.setScreenText(this.model.getSimonCount());


	};

	Controller.prototype.strictHandler = function(){
		this.view.toggleStrict();
	};









	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);