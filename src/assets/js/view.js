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
		View.prototype.toggleStrict = function(elem){
			$hasClass(elem, 'ind-off') ? $toggleClass(elem, 'ind-off', 'ind-on') : $toggleClass(elem, 'ind-on', 'ind-off');				
		};
		// toggle the strict mode button
		View.prototype.toggleStart = function(elem){
			$hasClass(elem, 'fa-play-circle-o') ? $toggleClass(elem, 'fa-play-circle-o', 'fa-stop') : $toggleClass(elem, 'fa-stop', 'fa-play-circle-o');
		};




		


	}


	window.app = window.app || {};
	window.app.View = View;
})(window);