// TODO: if start-btn has class fa-stop

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
        if (this.model.getGameState() === false){
            this.view._disableGameButtons();
        }
		this.view.setEventListener(function(id){
			self.buttonHandler(id);
		});
	};

	Controller.prototype.buttonHandler = function(id){
		if (id === 'start-btn'){
            this.startHandler();
		}else if(id === 'stop-btn'){
            this.stopHandler();
        }else if (id === 'strict-btn'){
			this.strictHandler();
		}
	};

	Controller.prototype.startHandler = function(){
            this.model.setGameState();
            this.view._enableGameButtons();
            this.view.toggleStart();
            this.view.animateScreenMode('start');
            this.view.setScreenText(this.model.getSimonCount());
    };

	Controller.prototype.strictHandler = function(){
        this.model.setStrictMode();
		this.view.toggleStrict();
	};

    Controller.prototype.stopHandler = function(){
        this.view.toggleStart();
    };








	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);