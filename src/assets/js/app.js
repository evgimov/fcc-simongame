/*global app, $on */
(function (){

	/**
	 * Sets up a new Simon Game.
	 *
	 */
 	function Simon(){
		this.model = new app.Model();
		this.view = new app.View();
		this.controller = new app.Controller(this.model, this.view);
	}

	var simon = new Simon();	

	function initGame(){
		simon.controller.initGame();
	}

	$on(window, 'load', initGame);
})();








