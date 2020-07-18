/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"demo_ImageBitmapLoader": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./demoSrc/demo_ImageBitmapLoader.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demoSrc/common.js":
/*!***************************!*\
  !*** ./demoSrc/common.js ***!
  \***************************/
/*! exports provided: initScene, initLight, initCamera, initControl, initRenderer, initHelper, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initScene\", function() { return initScene; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initLight\", function() { return initLight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initCamera\", function() { return initCamera; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initControl\", function() { return initControl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initRenderer\", function() { return initRenderer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initHelper\", function() { return initHelper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ \"./node_modules/three/examples/jsm/controls/OrbitControls.js\");\n\n\n\n\nfunction initScene() {\n  const scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n  return scene;\n}\nfunction initLight(scene) {\n  const ambientLight = new three__WEBPACK_IMPORTED_MODULE_0__[\"AmbientLight\"](0xffffff, 1.0);\n  scene.add(ambientLight);\n  return ambientLight;\n}\nfunction initCamera(scene, W, H) {\n  const camera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"](45, W / H, 1, 400);\n  camera.position.set(0, 0, 100);\n  camera.updateMatrixWorld(false);\n  scene.add(camera);\n  return camera;\n}\nfunction initControl(camera, render) {\n  const control = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__[\"OrbitControls\"](camera, render.domElement);\n  control.update();\n  return control;\n}\nfunction initRenderer(W, H) {\n  const renderOption = {\n    canvas: document.getElementById(\"webgl-canvas\"),\n    antialias: true\n  };\n  const renderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"](renderOption);\n  renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__[\"Color\"](0x000000));\n  renderer.setSize(W, H);\n  renderer.setPixelRatio(window.devicePixelRatio);\n  return renderer;\n}\nfunction initHelper(scene) {\n  const axesHelper = new three__WEBPACK_IMPORTED_MODULE_0__[\"AxesHelper\"](30);\n  scene.add(axesHelper);\n}\nfunction render(control, renderer, scene, camera) {\n  const rendering = () => {\n    control.update();\n    renderer.render(scene, camera);\n    requestAnimationFrame(rendering);\n  };\n\n  rendering();\n}\n\n//# sourceURL=webpack:///./demoSrc/common.js?");

/***/ }),

/***/ "./demoSrc/demo_ImageBitmapLoader.js":
/*!*******************************************!*\
  !*** ./demoSrc/demo_ImageBitmapLoader.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ \"./demoSrc/common.js\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/**\n * ImageBitmapLoaderを直接利用した場合のデモ。\n * サポートされていないブラウザーではエラーが発生する。\n * また、上下反転の補正は行われない。\n */\n\n\nconst W = 640;\nconst H = 480;\n\nconst onDomContentsLoaded = () => {\n  const scene = Object(_common__WEBPACK_IMPORTED_MODULE_0__[\"initScene\"])();\n  Object(_common__WEBPACK_IMPORTED_MODULE_0__[\"initLight\"])(scene);\n  const camera = Object(_common__WEBPACK_IMPORTED_MODULE_0__[\"initCamera\"])(scene, W, H);\n  const renderer = Object(_common__WEBPACK_IMPORTED_MODULE_0__[\"initRenderer\"])(W, H);\n  const control = Object(_common__WEBPACK_IMPORTED_MODULE_0__[\"initControl\"])(camera, renderer);\n  Object(_common__WEBPACK_IMPORTED_MODULE_0__[\"initHelper\"])(scene);\n  initSphere(scene);\n  Object(_common__WEBPACK_IMPORTED_MODULE_0__[\"render\"])(control, renderer, scene, camera);\n};\n\nconst initSphere = scene => {\n  const geo = new three__WEBPACK_IMPORTED_MODULE_1__[\"SphereGeometry\"](20, 16, 16);\n  const mat = new three__WEBPACK_IMPORTED_MODULE_1__[\"MeshBasicMaterial\"]();\n  const mesh = new three__WEBPACK_IMPORTED_MODULE_1__[\"Mesh\"](geo, mat);\n  scene.add(mesh);\n  const loader = new three__WEBPACK_IMPORTED_MODULE_1__[\"ImageBitmapLoader\"]();\n  loader.load(\"./earth.jpg\", function (imageBitmap) {\n    const texture = new three__WEBPACK_IMPORTED_MODULE_1__[\"CanvasTexture\"](imageBitmap);\n    mat.map = texture;\n    mat.needsUpdate = true;\n    console.log(texture);\n  }, undefined, function (err) {\n    console.log(\"An error happened\", err);\n  });\n};\n\nwindow.onload = onDomContentsLoaded;\n\n//# sourceURL=webpack:///./demoSrc/demo_ImageBitmapLoader.js?");

/***/ })

/******/ });