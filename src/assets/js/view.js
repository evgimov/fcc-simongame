(function (window){
	'use strict';

	function View(){

		//access to all classes and ids
		this.$appBody = $id('game-body');
		this.$gameScreen = $qs('#game-screen>span');
		this.$strictButton = $qs('#strict-btn>i');
		this.$startButton = $qs('#start-btn>i');
		this.$gameButtons = $qsa('#btn-g,#btn-r,#btn-b,#btn-y');
		this.$onButtons = $qsa('.br-green,.br-red,.br-blue,.br-yellow');
		// game state
		this.buttonClickable = false;
		this.startTimer = null;
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
		// trigger the click events
		View.prototype.setEventListener = function (callback){
			$on(this.$appBody, 'click', function(event){
				var t = event.target; // element triggered the click event
				var id = t.getAttribute("id");
				if (t && $hasClass(t,'btn')) {
					callback(id);
				} 
			});
		}
		// toggle the strict mode button
		View.prototype.toggleStrict = function(){
			$hasClass($strictButton, 'ind-off') ? $toggleClass($strictButton, 'ind-off', 'ind-on') : $toggleClass($strictButton, 'ind-on', 'ind-off');				
		};
		// toggle the strict mode button
		View.prototype.toggleStart = function(){
			$hasClass($startButton, 'fa-play-circle-o') ? $toggleClass($startButton, 'fa-play-circle-o', 'fa-stop') : $toggleClass($startButton, 'fa-stop', 'fa-play-circle-o');
		};
		// set the new screenMode
		View.prototype.setScreenMode = function(mode){
			$gameScreen.innerText = mode;
		};
		// display text animation
		View.prototype.animateScreenMode = function(mode){
			var that = this;
			var count = 0;
			var text = this.screenModes[mode];
			var timer = setInterval(function(){
				if (count === 6){
					clearInterval(timer);
				}
				else if (count % 2 === 0){
					that.setScreenMode(text); 
				}else{
					that.setScreenMode(' ');
				}
				count++;
			}, 500);
		};
		// get game button state
		View.prototype.isButtonClickable = function(){
			return this.buttonClickable;
		};
		// disable game buttons
		View.prototype.disableGameButtons = function(){
			this.buttonClickable = false;
			for (var i = 0; i < this.$gameButtons.length; i++){
				$gameButtons[i].disabled = true;
			}			
		};
		//enable game buttons
		View.prototype.enableGameButtons = function(){
			this.buttonClickable = true;
			for (var i = 0; i < this.$gameButtons.length; i++) {
				$gameButtons[i].disabled = false;
			}
		};
		// make sounds for game buttons
		View.prototype.playGameButton = function(btn){
			var sound = this.sounds[btn.id.slice(-1)]; // get the last letter of id value
			sound.play();
		};
		// do the button brighter
		View.prototype.doButtonBrighter = function(btn){
			btn.style.filter = 'brightness(150%)';
		};







		





		


	}


	window.app = window.app || {};
	window.app.View = View;
})(window);