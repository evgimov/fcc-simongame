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
    // initialize the game
	Controller.prototype.startGame = function(){
		var self = this;

        this.model.initGame();
        this.view._disableGameButtons();

		this.view.setEventListener(function(id){
			self.buttonHandler(id);
		});
	};
	//reset the game
	Controller.prototype.resetGame = function(){
        this.view.resetView();
        this.model.initGame();
    };
    // check which button was clicked
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
    // sets waiting timer. activates clicked button, checks player's next move and displays correspondent screen mode
	Controller.prototype.playerMoveHandler = function(id){
        var self = this;
        var toutAfterPlayer = null; // timer to set delay after player move

        clearTimeout(this.view.waitingTimer);
        this.setWaitingPeriod();

        this.view.playGameButton(id);
        this.view.doButtonBrighter(id);

        var val = this.model.checkNextMove(id);

        switch (val) {
            case 'continue':
                this.model.increasePlayerCount();
                break;
            case 'finish':
                this.view.animateScreenMode(val,this.view.screenModes['start'], function(){
                    self.resetGame();
                });
                break;
            case 'error':
                this.handlerErrorState();
                break;
        }

        if (this.model.playerCount === this.model.MAXSEQUENCE){
            this.view.animateScreenMode(this.model.checkNextMove(""),this.view.screenModes['start'], function(){
                self.resetGame();
            });
        }else if (this.model.playerCount === this.model.simonCount){
            toutAfterPlayer = setTimeout(function () {
                self.model.increaseSimonCount();
                self.model.resetPlayerCount();
                self.view.setScreenText(self.model.getSimonCount());
                self.view._disableGameButtons();
                self.setWaitingPeriod();
            },500);
            this.view.timeouts.push(toutAfterPlayer);
        }
    };
    // starts the game, animates initial screen mode, shows first computer moves
	Controller.prototype.startHandler = function(){
        var self = this;

        this.view.toggleStart();
        this.view.animateScreenMode('start', this.model.getSimonCount(), function(){
            self.setWaitingPeriod();
        });
    };
    // change the strictMode
	Controller.prototype.strictHandler = function(){
        this.model.setStrictMode();
        this.view.toggleStrict();
	};
    // stop the game, reset all variables in game
    Controller.prototype.stopHandler = function(){
        this.resetGame();
    };
    // show next computer moves with delay
    Controller.prototype.showComputerMoves = function(callback){
        var self = this;
        var count = 0;
        var toutBtn = null; // timer for delay between activated buttons

        var moves = this.model.getMovesList(this.model.getSimonCount());
        for (var i = 0; i < moves.length; i++){
            (function(){
                var move = moves[i];
                toutBtn = setTimeout(function () {
                    self.view.playGameButton(move);
                    self.view.doButtonBrighter(move);
                    if (i === count){
                        callback(1000 * (i + 1));
                    }
                }, 1000 * (i + 1));
            })();
            this.view.timeouts.push(toutBtn);
            count++;
        }
    };

    // restart the game or get a chance to play
    Controller.prototype.handlerErrorState = function(){
        var self = this;
        if (this.model.getStrictMode() === true){
            this.view.animateScreenMode('error',"", function(){
                self.resetGame();
                self.startHandler();
            });
        } else {
            this.view.animateScreenMode('error',this.model.getSimonCount(), function(){
                self.model.resetPlayerCount();
                self.setWaitingPeriod();
            });
        }
    };
    // sets waiting time between player's actions and set the waiting time after computer moves
    Controller.prototype.setWaitingPeriod = function(){
        var self = this;
        var toutAfterComp = null; // timer to set delay after comp moves

        clearTimeout(this.view.waitingTimer);
        this.view.waitingTimer = setTimeout(function(){
            self.handlerErrorState();
        }, 6 * 1000);

        this.showComputerMoves(function (delay) {
            toutAfterComp = setTimeout(function () {
                if (!self.view.isButtonClickable()) {
                    self.view._enableGameButtons();
                }
            }, delay - 750);
            self.view.timeouts.push(toutAfterComp);
        });
    };


	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);