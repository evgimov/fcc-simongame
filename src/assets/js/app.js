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
    // create simon instance
	var simon = new Simon();	

    // entry point of game
	function initGame(){
		simon.controller.initGame();
	}
    // after DOM is loaded call the initGame function
	$on(window, 'load', initGame);
})();








