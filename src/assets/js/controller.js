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
        if (this.model.getGameState() === false){
            this.view._disableGameButtons();
        }
		this.view.setEventListener(function(id){
			self.buttonHandler(id);
		});
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
    // activates clicked button, checks player's next move and displays correspondent screen mode
	Controller.prototype.playerMoveHandler = function(id){
        var self = this;
        var toutAfterPlayer = null; // timer to set delay after player move

        this.view.playGameButton(id);
        this.view.doButtonBrighter(id);

        var val = this.model.checkNextMove(id);
        switch (val) {
            case 'continue':
                this.model.increasePlayerCount();
                break;
            case 'finish':
                this.view.animateScreenMode(val,this.view.screenModes['start'], function(){
                    self.view.resetView();
                    self.model.initGame();
                });
                break;
            case 'error':
                if (this.model.getStrictMode() === true){
                    this.view.animateScreenMode(val,this.view.screenModes['start'], function(){
                        self.model.initGame();
                        self.view.resetView();
                        self.startHandler();
                    });
                } else {
                    this.view.animateScreenMode(val,this.model.getSimonCount(), function(){
                        self.model.playerCount = 0;
                        self.view._disableGameButtons();
                        self.setDelayAfterComp();
                    });
                }
                break;
        }

        if (this.model.playerCount === this.model.MAXSEQUENCE){
            this.view.animateScreenMode(this.model.checkNextMove(""),this.view.screenModes['start'], function(){
                self.view.resetView();
            });
        }else if (this.model.playerCount === this.model.simonCount){
            toutAfterPlayer = setTimeout(function () {
                self.model.increaseSimonCount();
                self.model.playerCount = 0;
                self.view.setScreenText(self.model.getSimonCount());
                self.view._disableGameButtons();
                self.setDelayAfterComp();
            },500);
            this.view.timeouts.push(toutAfterPlayer);
        }
    };
    // starts the game, animates initial screen mode, shows first computer moves
	Controller.prototype.startHandler = function(){
        var self = this;

        this.view.toggleStart();
        this.view.animateScreenMode('start', this.model.getSimonCount(), function(){
            self.setDelayAfterComp();
        });
    };
    // change the strictMode
	Controller.prototype.strictHandler = function(){
        this.model.setStrictMode();
        this.view.toggleStrict();
	};
    // stop the game, reset all variables in game
    Controller.prototype.stopHandler = function(){
        this.view.resetView();
        this.model.initGame();
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

    Controller.prototype.setDelayAfterComp = function(){
        var self = this;
        var toutAfterComp = null; // timer to set delay after comp moves
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