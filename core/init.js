/**
 * Server of RealTimePlatformGame main file.
 * Every start here
 * @module Server
 * @author Claudio Marrero
 * @copyright 2014 Claudio A. Marrero
 */

module.exports = function(io){

	var Game = (function(){

		function setup(socket){

		}

		function listener(socket){

		}

		return {
			setup:setup
		}
	})();

	io.sockets.on('connection', Game.setup);
};