(function (window){
	'use strict';

	var $qs = function(selector) {
		return document.querySelector(selector);
	};

	function View(){
		//access to all classes and ids
		this.$appBody = $id('game-body');
		this.$gameScreen = $qs('#game-screen>span');
		this.$strictButton = $qs('#strict-btn>i');
		this.$startButton = $id('start-btn');
		this.$gameButtons = $qsa('#btn-g,#btn-r,#btn-b,#btn-y');

		// interface
		this.buttonClickable = false;
		this.startTimer = null;
        this.timeouts = [];

		//animations
		this.screenModes = {
			start: '--',
			error: '!!',
			finish: 'Winner'
		};
		//sounds
		this.sounds = {
			g: $id('audio-g'),
			r: $id('audio-r'),
			y: $id('audio-y'),
			b: $id('audio-b')
		};
	}
	// trigger the click events
	View.prototype.setEventListener = function (callback){
		$on(this.$appBody, 'click', function(event){
			var t = event.target; // element triggered the click event
			var id = t.getAttribute("id");
			if (t && $hasClass(t,'btn')) {
				callback(id);
			} 
		});
	};
	// toggle the strict mode button
	View.prototype.toggleStrict = function(){
		$hasClass(this.$strictButton, 'ind-off') ? $toggleClass(this.$strictButton, 'ind-off', 'ind-on') : $toggleClass(this.$strictButton, 'ind-on', 'ind-off');				
	};
	// toggle the strict mode button
	View.prototype.toggleStart = function(){
        this.$startButton.id === 'start-btn' ? this.$startButton.id = 'stop-btn' :  this.$startButton.id = 'start-btn';
        $hasClass(this.$startButton.firstChild, 'fa-play-circle-o') ? $toggleClass(this.$startButton.firstChild, 'fa-play-circle-o', 'fa-stop') : $toggleClass(this.$startButton.firstChild, 'fa-stop', 'fa-play-circle-o');
	};
	// set new screen text
	View.prototype.setScreenText = function(text){
		if (typeof text === 'number'){
			if(text < 10){
				text = '0' + text;
			}
		}
		this.$gameScreen.innerText = text;
	};
	// display text animation
	View.prototype.animateScreenMode = function(mode,step, callback){
		var self = this;
		var count = 0; // for count intervals
        this._disableGameButtons();
		var text = this.screenModes[mode];
		this.startTimer = setInterval(function(){
			if (count === 6){
				clearInterval(self.startTimer);
                self.setScreenText(step);
                callback();
			}
			else if (count % 2 === 0){
				self.setScreenText(text);
			}else{
				self.setScreenText(' ');
			}
			count++;
		}, 500);
    };
	// get game button state
	View.prototype.isButtonClickable = function(){
		return this.buttonClickable;
	};
	// disable game buttons
	View.prototype._disableGameButtons = function(){
		this.buttonClickable = false;
		for (var i = 0; i < this.$gameButtons.length; i++){
			this.$gameButtons[i].disabled = true;
		}			
	};
	//enable game buttons
	View.prototype._enableGameButtons = function(){
		this.buttonClickable = true;
		for (var i = 0; i < this.$gameButtons.length; i++) {
			this.$gameButtons[i].disabled = false;
		}
	};
	// make sounds for game buttons
	View.prototype.playGameButton = function(btn){
		var sound = this.sounds[btn.slice(-1)]; // get the last letter of id value
		sound.play();
	};
	// do the button brighter
	View.prototype.doButtonBrighter = function(btn){
        $id(btn).style.filter = 'brightness(150%)';
        var tout = setTimeout(function(){
            $id(btn).style.filter = 'brightness(100%)';
        }, 750);
        this.timeouts.push(tout);
	};
    // reset view of the game
	View.prototype.resetView = function(){
        this.clearTimers();
        this.toggleStart();
        this.setScreenText(this.screenModes['start']);
        this._disableGameButtons();
    };
    // stop all timers in the game
    View.prototype.clearTimers = function(){
        for (var i = 0; i < this.timeouts.length; i++){
            clearTimeout(this.timeouts[i]);
        }
        clearInterval(this.startTimer);
        this.timeouts = [];
    };


	window.app = window.app || {};
	window.app.View = View;
})(window);