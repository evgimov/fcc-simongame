//Todo: show the computer moves after screen animation is complete

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
        var self = this;
        this.model.setGameState();
        this.view._enableGameButtons();
        this.view.toggleStart();
        this.view.animateScreenMode('start', this.model.getSimonCount(), function(){
            self.showComputerMoves();
        });


    };

	Controller.prototype.strictHandler = function(){
        this.model.setStrictMode();
        this.view.toggleStrict();
	};

    Controller.prototype.stopHandler = function(){
        this.view.toggleStart();
        this.model.setGameState();
        this.view.setScreenText('--');
    };
    Controller.prototype.showComputerMoves = function(){
        var self = this;
        var moves = this.model.getMovesList(this.model.getSimonCount());
        for (var i = 0; i < moves.length; i++){
            (function(){
                var move = moves[i];
                setTimeout(function () {
                    self.view.playGameButton(move);
                    self.view.doButtonBrighter(move);
                }, 1000 * (i + 1));
            })();
        }
    };









	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);