(function (window){
	'use strict';

	function View(){

		//access to all classes and ids
		this.$appBody = $id('game-body');
		this.$gameScreen = $qs('#game-screen>span');
		this.$strictButton = $qs('#strict-btn>i');
		this.$startButton = $qs('#start-btn>i');
		this.$gameButtons = $qsa(document,'#btn-g','#btn-r','#btn-b','btn-y');
		this.$onButtons = $qsa(document,'.br-green','.br-red','br-blue','br-yellow');
		// game state
		this.buttonClickable = false;
		this.startTimer = null;
		//animations
		this.screenModes = {
			start: '--',
			error: '!!',
			finish: 'Winner'
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




		





		


	}


	window.app = window.app || {};
	window.app.View = View;
})(window);