/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	function connectToParticle(deviceID, accessToken) {
	    console.log('Conectando a Particle ..');

	    var API_URL = 'https://api.spark.io/v1/devices/';

	    var dataElement = document.getElementById('data');
	    var eventSource = new EventSource(API_URL + deviceID + "/events/?access_token=" + accessToken);

	    eventSource.addEventListener('open', function (e) {
	        console.log("Opened!");
	    }, false);

	    eventSource.addEventListener('error', function (e) {
	        console.log("Errored!");
	    }, false);

	    eventSource.addEventListener('btn_push', function (e) {
	        var parsedData = JSON.parse(e.data);
	        console.log('Boton pulsado', parsedData);

	        dataElement.innerHTML = e.data;
	        // POST en la base da datos de Firebase
	        firebase.database().ref("sensor/btn_push").set(parsedData);
	    }, false);

	    return eventSource;
	}
	connectToParticle('330047000b47353137323334', '83003fdac84d9a2684e8fc1a1ae9573ac2db6a99');

/***/ }
/******/ ]);