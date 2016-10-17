(function (window){
	'use strict';

	function View(){

		//access to all classes and ids
		this.$appBody = $qs('#game-body');
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

	}


	window.app = window.app || {};
	window.app.View = View;
})(window);