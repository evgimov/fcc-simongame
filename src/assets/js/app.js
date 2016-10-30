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
	function start(){
		simon.controller.startGame();
	}
    // after DOM is loaded call the start function
	$on(window, 'load', start);
})();








