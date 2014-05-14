/**
 * Server of RealTimePlatformGame main file.
 * Every start here
 * @module Server
 * @author Claudio Marrero
 * @copyright 2014 Claudio A. Marrero
 */

'use strict';
/**
 * Load module for clustering
 * @property cluster
 * @type {*} cluster Module for clustering
 */
var cluster = exports.cluster = require('cluster');

/**
 * Quantity of cpus of the server
 * @property numCPUs
 * @type {Queue.length|*|types.length|length|details.length|.__defineGetter__.length}
 */
var numCPUs = require('os').cpus().length;

/**
 * Permits clustering the sockets
 * @property socket_cluster
 * @type {exports}
 */
var socket_cluster = require('socket.io-clusterhub');

/**
 * Instance of socket_cluster
 * @property store
 * @type {socket_cluster}
 */
var store = new socket_cluster();

/**
 * Separations of master an workers cpus
 */
if (cluster.isMaster) {

	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', function() {
		cluster.fork();
	});

	console.info('Server Init',null);

} else {
	console.info('CPU Start',null);

	/**
	 * load module express
	 * @property express
	 * @type {*}
	 */
	var express = require('express');

	/**
	 * Instance of express create server
	 * @property app
	 * @type {*}
	 */
	var app = express();

	/**
	 * Load module http
	 * @property http
	 * @type {*}
	 */
	var http = require('http');

	/**
	 *
	 * @type {exports}
	 */
	var io = require('socket.io');
	app.use('/',express.static('./client'));

	/**
	 * Secure server
	 * @type {Function|*|Server}
	 */
	var server = http.createServer(app);
	server.listen(process.env.PORT || 80);

	/**
	 * Instance an lisen socket.io
	 * @property sio
	 * @type {*}
	 */
	var sio = io.listen(server);
	/**
	 *  Configuracion for production
	 * Load module and instance socket.io
	 * @property io
	 * @type {exports}
	 */

	sio.configure('production', function(){
		sio.enable('browser client minification');
		sio.enable('browser client etag');
		sio.enable('browser client gzip');
		sio.set('log level', 1);
	});

	/**
	 * Configuracion for development
	 */
	sio.configure('development', function(){
//		sio.set('log level', 1);
	});


	/**
	 * Configure authorization of socket.io with sessions
	 * @property sioConfigure
	 * @type {function}
	 */
	var sioConfigure = function() {
		sio.set('store', store);
	};

	sio.configure(sioConfigure);


	/**
	 * instance of Core
	 * @module Core
	 * @param {json} params
	 */
	require('./core/init.js')(sio);
}

