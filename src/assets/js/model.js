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
		this.gameState = false;
	}
	// creates a new sequence and resets model variables
	Model.prototype.startGame = function(options){
		this.simonSequence = [];
		this.createSequence();
		this.simonCount = 1;
		this.playerCount = 0;
		this.gameState = false;
	};
	// creates a new random sequence using helper functions
	Model.prototype.createSequence = function(){
		for (var i = 0; i < this.MAXSEQUENCE; i++){
			this.simonSequence.push($fromIntToChar($rand(1,4)));
		}
	};
	// increases simonCount
	Model.prototype.increaseSimonCount = function(){
		this.simonCount++;
	};
	// increases playerCount
	Model.prototype.increasePlayerCount = function(){
		this.playerCount++;
	};
	// gets a current value of simonCount
	Model.prototype.getSimonCount = function(){
		return this.simonCount;
	};
	// sets StrictMode for the game
	Model.prototype.setStrictMode = function(){
		this.strictMode = !this.strictMode;
	};
	// gets a current value of StrictMode
	Model.prototype.getStrictMode = function(){
		return this.strictMode;
	};
	// sets gameState value in false
	Model.prototype.setGameState = function(state){
		this.gameState = !this.gameState;
	};
	// gets the current value of gameState
	Model.prototype.getGameState = function(){
		return this.gameState;
	}
	// gets the simonSequence
	Model.prototype.getMovesList = function(step){
		return this.simonSequence.slice(0,step);
	};
	// checks the current step in game
	Model.prototype.checkNextMove = function(move){
		if (this.MAXSEQUENCE === this.playerCount) {
			return 'finish';
		}else if(this.simonSequence[this.playerCount - 1] === move){
			return 'continue';
		}else {
			return 'error';
		}
	};

	
	window.app = window.app || {};
	window.app.Model = Model;
})(window);