/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./demoSrc/common.js":
/*!***************************!*\
  !*** ./demoSrc/common.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initScene\": () => (/* binding */ initScene),\n/* harmony export */   \"initLight\": () => (/* binding */ initLight),\n/* harmony export */   \"initCamera\": () => (/* binding */ initCamera),\n/* harmony export */   \"initControl\": () => (/* binding */ initControl),\n/* harmony export */   \"initRenderer\": () => (/* binding */ initRenderer),\n/* harmony export */   \"initHelper\": () => (/* binding */ initHelper),\n/* harmony export */   \"render\": () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ \"./node_modules/three/examples/jsm/controls/OrbitControls.js\");\n\n\n\n\nfunction initScene() {\n  const scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();\n  return scene;\n}\nfunction initLight(scene) {\n  const ambientLight = new three__WEBPACK_IMPORTED_MODULE_1__.AmbientLight(0xffffff, 1.0);\n  scene.add(ambientLight);\n  return ambientLight;\n}\nfunction initCamera(scene, W, H) {\n  const camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(45, W / H, 1, 400);\n  camera.position.set(0, 0, 100);\n  camera.updateMatrixWorld(false);\n  scene.add(camera);\n  return camera;\n}\nfunction initControl(camera, render) {\n  const control = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, render.domElement);\n  control.update();\n  return control;\n}\nfunction initRenderer(W, H) {\n  const renderOption = {\n    canvas: document.getElementById(\"webgl-canvas\"),\n    antialias: true\n  };\n  const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer(renderOption);\n  renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x000000));\n  renderer.setSize(W, H);\n  renderer.setPixelRatio(window.devicePixelRatio);\n  return renderer;\n}\nfunction initHelper(scene) {\n  const axesHelper = new three__WEBPACK_IMPORTED_MODULE_1__.AxesHelper(30);\n  scene.add(axesHelper);\n}\nfunction render(control, renderer, scene, camera) {\n  const rendering = () => {\n    control.update();\n    renderer.render(scene, camera);\n    requestAnimationFrame(rendering);\n  };\n\n  rendering();\n}\n\n//# sourceURL=webpack://threejs-texture-switching-loader/./demoSrc/common.js?");

/***/ }),

/***/ "./demoSrc/demo.js":
/*!*************************!*\
  !*** ./demoSrc/demo.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/index */ \"./lib/index.js\");\n/* harmony import */ var _lib_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_index__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ \"./demoSrc/common.js\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\n\nconst W = 640;\nconst H = 480;\n\nconst onDomContentsLoaded = () => {\n  const scene = (0,_common__WEBPACK_IMPORTED_MODULE_1__.initScene)();\n  (0,_common__WEBPACK_IMPORTED_MODULE_1__.initLight)(scene);\n  const camera = (0,_common__WEBPACK_IMPORTED_MODULE_1__.initCamera)(scene, W, H);\n  const renderer = (0,_common__WEBPACK_IMPORTED_MODULE_1__.initRenderer)(W, H);\n  const control = (0,_common__WEBPACK_IMPORTED_MODULE_1__.initControl)(camera, renderer);\n  (0,_common__WEBPACK_IMPORTED_MODULE_1__.initHelper)(scene);\n  initSphere(scene);\n  (0,_common__WEBPACK_IMPORTED_MODULE_1__.render)(control, renderer, scene, camera);\n};\n\nconst initSphere = scene => {\n  const geo = new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(20, 16, 16);\n  const mat = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial();\n  const mesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(geo, mat);\n  scene.add(mesh);\n  let texture1;\n  let texture2;\n  three__WEBPACK_IMPORTED_MODULE_2__.Cache.enabled = true;\n  const loader = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.TextureSwitchingLoader();\n  loader.load(\"./earth.jpg\", {\n    imageBitmapOption: {\n      imageOrientation: \"flipY\"\n    }\n  }).then(texture => {\n    mat.map = texture;\n    mat.needsUpdate = true;\n    console.log(\"1st Load\");\n    console.log(texture.image);\n    texture1 = texture;\n    loader.load(\"./earth.jpg\").then(texture => {\n      console.log(\"2nd Load\");\n      console.log(texture.image);\n      texture2 = texture;\n\n      if (texture1.image === texture2.image) {\n        console.log(\"share!\");\n      }\n    });\n  });\n  loader.load(\"./earth.jpg\");\n  loader.load(\"./earth.jpg\");\n  loader.load(\"./earth.jpg\");\n  loader.load(\"./earth.jpg\");\n  loader.load(\"./earth.jpg\");\n  setTimeout(() => {\n    loader.load(\"./earth.jpg\");\n    loader.load(\"./earth.jpg\");\n    loader.load(\"./earth.jpg\");\n    loader.load(\"./earth.jpg\");\n    loader.load(\"./earth.jpg\");\n  }, 2000);\n};\n\nwindow.onload = onDomContentsLoaded;\n\n//# sourceURL=webpack://threejs-texture-switching-loader/./demoSrc/demo.js?");

/***/ }),

/***/ "./lib/CanvasTextureOption.js":
/*!************************************!*\
  !*** ./lib/CanvasTextureOption.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\n//# sourceURL=webpack://threejs-texture-switching-loader/./lib/CanvasTextureOption.js?");

/***/ }),

/***/ "./lib/TextureSwitchingLoader.js":
/*!***************************************!*\
  !*** ./lib/TextureSwitchingLoader.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.TextureSwitchingLoader = void 0;\n\nconst three_1 = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/**\n * Texture image loader, Switching TextureLoader and ImageBitmapLoader.\n */\n\n\nclass TextureSwitchingLoader {\n  constructor(manager) {\n    if (TextureSwitchingLoader.isSupportImageBitmap === undefined) {\n      TextureSwitchingLoader.isSupportImageBitmap = typeof createImageBitmap !== \"undefined\";\n    }\n\n    if (!TextureSwitchingLoader.isSupportImageBitmap) {\n      this.textureLoader = new three_1.TextureLoader(manager);\n    } else {\n      this.imageBitmapLoader = new three_1.ImageBitmapLoader(manager);\n      this.imageBitmapLoader.setOptions({\n        imageOrientation: \"flipY\"\n      }); //To find the same result TextureLoader and ImageBitmapLoader.\n    }\n  }\n  /**\n   * Load image as Texture or CanvasTexture.\n   *\n   * @param url\n   * @param option\n   * @return Promise<Texture> Texture or CanvasTexture\n   */\n\n\n  load(url, option) {\n    if (option == null) {\n      option = {};\n    }\n\n    if (TextureSwitchingLoader.isSupportImageBitmap) {\n      return this.loadImageBitmap(url, option);\n    }\n\n    return this.loadTexture(url, option);\n  }\n\n  loadImageBitmap(url, option) {\n    return new Promise((resolve, reject) => {\n      const onload = imageBitmap => {\n        const texture = new three_1.CanvasTexture(imageBitmap);\n        TextureSwitchingLoader.setTextureOptions(texture, option.canvasTextureOption);\n        resolve(texture);\n      };\n\n      if (option.imageBitmapOption) {\n        this.imageBitmapLoader.setOptions(option.imageBitmapOption);\n      }\n\n      this.imageBitmapLoader.load(url, onload, undefined, err => {\n        console.log(\"TextureSwitchingLoader : \");\n        reject(err);\n      });\n    });\n  }\n\n  loadTexture(url, option) {\n    return new Promise((resolve, reject) => {\n      this.textureLoader.load(url, texture => {\n        TextureSwitchingLoader.setImageBitmapOptions(texture, option.imageBitmapOption);\n        TextureSwitchingLoader.setTextureOptions(texture, option.canvasTextureOption);\n        resolve(texture);\n      }, undefined, err => {\n        console.log(\"TextureSwitchingLoader : \");\n        reject(err);\n      });\n    });\n  }\n\n  static setTextureOptions(texture, option) {\n    var _a, _b, _c, _d, _e, _f, _g, _h;\n\n    if (option == null) return;\n    (_a = texture.mapping) !== null && _a !== void 0 ? _a : texture.mapping = option.mapping;\n    (_b = texture.wrapS) !== null && _b !== void 0 ? _b : texture.wrapS = option.wrapS;\n    (_c = texture.wrapT) !== null && _c !== void 0 ? _c : texture.wrapT = option.wrapT;\n    (_d = texture.magFilter) !== null && _d !== void 0 ? _d : texture.magFilter = option.magFilter;\n    (_e = texture.minFilter) !== null && _e !== void 0 ? _e : texture.minFilter = option.minFilter;\n    (_f = texture.format) !== null && _f !== void 0 ? _f : texture.format = option.format;\n    (_g = texture.type) !== null && _g !== void 0 ? _g : texture.type = option.type;\n    (_h = texture.anisotropy) !== null && _h !== void 0 ? _h : texture.anisotropy = option.anisotropy;\n  }\n\n  static setImageBitmapOptions(texture, imageBitmapOption) {\n    if (imageBitmapOption == null) return;\n    const orientation = imageBitmapOption.imageOrientation;\n\n    if (orientation != null) {\n      texture.flipY = orientation === \"flipY\";\n    }\n\n    if (imageBitmapOption.premultiplyAlpha != null) texture.premultiplyAlpha = imageBitmapOption.premultiplyAlpha === \"premultiply\";\n  }\n\n}\n\nexports.TextureSwitchingLoader = TextureSwitchingLoader;\n\n//# sourceURL=webpack://threejs-texture-switching-loader/./lib/TextureSwitchingLoader.js?");

/***/ }),

/***/ "./lib/TextureSwitchingLoaderOption.js":
/*!*********************************************!*\
  !*** ./lib/TextureSwitchingLoaderOption.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\n//# sourceURL=webpack://threejs-texture-switching-loader/./lib/TextureSwitchingLoaderOption.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __exportStar = this && this.__exportStar || function (m, exports) {\n  for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\n__exportStar(__webpack_require__(/*! ./TextureSwitchingLoader */ \"./lib/TextureSwitchingLoader.js\"), exports);\n\n__exportStar(__webpack_require__(/*! ./CanvasTextureOption */ \"./lib/CanvasTextureOption.js\"), exports);\n\n__exportStar(__webpack_require__(/*! ./TextureSwitchingLoaderOption */ \"./lib/TextureSwitchingLoaderOption.js\"), exports);\n\n//# sourceURL=webpack://threejs-texture-switching-loader/./lib/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {};
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"demo": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./demoSrc/demo.js","vendor"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkthreejs_texture_switching_loader"] = self["webpackChunkthreejs_texture_switching_loader"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;