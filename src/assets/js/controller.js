// TODO: check if

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
		else {
            this.playerMoveHandler(id);
        }
	};

	Controller.prototype.playerMoveHandler = function(id){
        var self = this;
        var tout = null;
        console.log("Button id:" + id);
        console.log("Player count:" + this.model.playerCount);
        console.log("Simon count:" + this.model.simonCount);

        this.view.playGameButton(id);
        this.view.doButtonBrighter(id);
        var val = this.model.checkNextMove(id);
        switch (val) {
            case 'continue':
                this.model.playerCount++;
                console.log("Player:" + this.model.playerCount);
                break;
            case 'finish':

                break;
            case 'error':

                break;
        }

        if (this.model.playerCount === this.model.simonCount){
            tout = setTimeout(function () {
                self.model.simonCount++;
                self.model.playerCount = 0;
                console.log("Simon:" + self.model.simonCount);
                self.view.setScreenText(self.model.getSimonCount());
                self.view._disableGameButtons();
                self.showComputerMoves(function (delay) {
                    setTimeout(function () {
                        if (!self.view.buttonClickable) {
                            self.view._enableGameButtons();
                        }
                        else {

                        }
                    }, delay);
                });
            },500);
            this.view.timeouts.push(tout);
        }
    };

	Controller.prototype.startHandler = function(){
        var self = this;
        this.model.setGameState();
        this.view.toggleStart();
        this.view.animateScreenMode('start', this.model.getSimonCount(), function(){
            self.showComputerMoves(function(delay){
                setTimeout(function(){
                    if (!self.view.buttonClickable){
                        self.view._enableGameButtons();
                    }
                },delay - 750);
            });
        });
    };

	Controller.prototype.strictHandler = function(){
        this.model.setStrictMode();
        this.view.toggleStrict();
	};

    Controller.prototype.stopHandler = function(){
        this.view.resetView();
        this.model.setGameState();

    };
    Controller.prototype.showComputerMoves = function(callback){
        var self = this;
        var count = 0;
        var moves = this.model.getMovesList(this.model.getSimonCount());
        var tout = null;
        for (var i = 0; i < moves.length; i++){
            (function(){
                var move = moves[i];
                tout = setTimeout(function () {
                    self.view.playGameButton(move);
                    self.view.doButtonBrighter(move);
                    if (i === count){
                        callback(1000 * (i + 1));
                    }
                }, 1000 * (i + 1));
            })();
            this.view.timeouts.push(tout);
            count++;
        }
    };









	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);