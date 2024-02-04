(()=>{"use strict";var __webpack_modules__={763:(__unused_webpack___webpack_module__,__unused_webpack___webpack_exports__,__webpack_require__)=>{eval('\n// EXTERNAL MODULE: ./node_modules/three/build/three.module.js\nvar three_module = __webpack_require__(75);\n;// CONCATENATED MODULE: ./esm/TextureSwitchingLoader.js\n\n/**\n * Texture image loader, Switching TextureLoader and ImageBitmapLoader.\n */\nclass TextureSwitchingLoader {\n  constructor(manager) {\n    if (TextureSwitchingLoader.isSupportImageBitmap === undefined) {\n      TextureSwitchingLoader.isSupportImageBitmap = typeof createImageBitmap !== "undefined";\n    }\n    if (!TextureSwitchingLoader.isSupportImageBitmap) {\n      this.textureLoader = new three_module/* TextureLoader */.dpR(manager);\n    } else {\n      this.imageBitmapLoader = new three_module/* ImageBitmapLoader */.QRU(manager);\n      this.imageBitmapLoader.setOptions({\n        imageOrientation: "flipY"\n      }); //To find the same result TextureLoader and ImageBitmapLoader.\n    }\n  }\n  /**\n   * Load image as Texture or CanvasTexture.\n   *\n   * @param url\n   * @param option\n   * @return Promise<Texture> Texture or CanvasTexture\n   */\n  load(url, option) {\n    if (option == null) {\n      option = {};\n    }\n    if (TextureSwitchingLoader.isSupportImageBitmap) {\n      return this.loadImageBitmap(url, option);\n    }\n    return this.loadTexture(url, option);\n  }\n  loadImageBitmap(url, option) {\n    return new Promise((resolve, reject) => {\n      const onload = imageBitmap => {\n        const texture = new three_module/* CanvasTexture */.ROQ(imageBitmap);\n        TextureSwitchingLoader.setTextureOptions(texture, option.canvasTextureOption);\n        resolve(texture);\n      };\n      if (option.imageBitmapOption) {\n        this.imageBitmapLoader.setOptions(option.imageBitmapOption);\n      }\n      this.imageBitmapLoader.load(url, onload, undefined, err => {\n        console.log("TextureSwitchingLoader : ");\n        reject(err);\n      });\n    });\n  }\n  loadTexture(url, option) {\n    return new Promise((resolve, reject) => {\n      this.textureLoader.load(url, texture => {\n        TextureSwitchingLoader.setImageBitmapOptions(texture, option.imageBitmapOption);\n        TextureSwitchingLoader.setTextureOptions(texture, option.canvasTextureOption);\n        resolve(texture);\n      }, undefined, err => {\n        console.log("TextureSwitchingLoader : ");\n        reject(err);\n      });\n    });\n  }\n  static setTextureOptions(texture, option) {\n    texture.mapping ??= option?.mapping;\n    texture.wrapS ??= option?.wrapS;\n    texture.wrapT ??= option?.wrapT;\n    texture.minFilter ??= option?.minFilter;\n    texture.format ??= option?.format;\n    texture.type ??= option?.type;\n    texture.anisotropy ??= option?.anisotropy;\n    texture.colorSpace = option?.colorSpace ?? "srgb";\n  }\n  static setImageBitmapOptions(texture, imageBitmapOption) {\n    const orientation = imageBitmapOption?.imageOrientation;\n    if (orientation != null) {\n      texture.flipY = orientation === "flipY";\n    }\n    if (imageBitmapOption?.premultiplyAlpha != null) texture.premultiplyAlpha = imageBitmapOption.premultiplyAlpha === "premultiply";\n  }\n}\n// EXTERNAL MODULE: ./node_modules/three/examples/jsm/controls/OrbitControls.js\nvar OrbitControls = __webpack_require__(12);\n;// CONCATENATED MODULE: ./demoSrc/common.js\n\n\n\n\nfunction initScene() {\n  const scene = new three_module/* Scene */.xsS();\n  return scene;\n}\nfunction initLight(scene) {\n  const ambientLight = new three_module/* AmbientLight */.Mig(0xffffff, 1.0);\n  scene.add(ambientLight);\n  return ambientLight;\n}\nfunction initCamera(scene, W, H) {\n  const camera = new three_module/* PerspectiveCamera */.cPb(45, W / H, 1, 400);\n  camera.position.set(0, 0, 100);\n  camera.updateMatrixWorld(false);\n  scene.add(camera);\n  return camera;\n}\nfunction initControl(camera, render) {\n  const control = new OrbitControls/* OrbitControls */.z(camera, render.domElement);\n  control.update();\n  return control;\n}\nfunction initRenderer(W, H) {\n  const renderOption = {\n    canvas: document.getElementById("webgl-canvas"),\n    antialias: true\n  };\n  const renderer = new three_module/* WebGLRenderer */.CP7(renderOption);\n  renderer.setClearColor(new three_module/* Color */.Ilk(0x000000));\n  renderer.setSize(W, H);\n  renderer.setPixelRatio(window.devicePixelRatio);\n  return renderer;\n}\nfunction initHelper(scene) {\n  const axesHelper = new three_module/* AxesHelper */.y8_(30);\n  scene.add(axesHelper);\n}\nfunction render(control, renderer, scene, camera) {\n  const rendering = () => {\n    control.update();\n    renderer.render(scene, camera);\n    requestAnimationFrame(rendering);\n  };\n  rendering();\n}\n;// CONCATENATED MODULE: ./demoSrc/demo.js\n\n\n\nconst W = 640;\nconst H = 480;\nconst onDomContentsLoaded = () => {\n  const scene = initScene();\n  initLight(scene);\n  const camera = initCamera(scene, W, H);\n  const renderer = initRenderer(W, H);\n  const control = initControl(camera, renderer);\n  initHelper(scene);\n  initSphere(scene);\n  render(control, renderer, scene, camera);\n};\nconst initSphere = scene => {\n  const geo = new three_module/* SphereGeometry */.xo$(20, 16, 16);\n  const mat = new three_module/* MeshBasicMaterial */.vBJ();\n  const mesh = new three_module/* Mesh */.Kj0(geo, mat);\n  scene.add(mesh);\n  let texture1;\n  let texture2;\n  three_module/* Cache */.CtF.enabled = true;\n  const loader = new TextureSwitchingLoader();\n  loader.load("./earth.jpg", {\n    imageBitmapOption: {\n      imageOrientation: "flipY"\n    }\n  }).then(texture => {\n    mat.map = texture;\n    mat.needsUpdate = true;\n    console.log("1st Load");\n    console.log(texture.image);\n    texture1 = texture;\n    loader.load("./earth.jpg").then(texture => {\n      console.log("2nd Load");\n      console.log(texture.image);\n      texture2 = texture;\n      if (texture1.image === texture2.image) {\n        console.log("share!");\n      }\n    });\n  });\n  loader.load("./earth.jpg");\n  loader.load("./earth.jpg");\n  loader.load("./earth.jpg");\n  loader.load("./earth.jpg");\n  loader.load("./earth.jpg");\n  setTimeout(() => {\n    loader.load("./earth.jpg");\n    loader.load("./earth.jpg");\n    loader.load("./earth.jpg");\n    loader.load("./earth.jpg");\n    loader.load("./earth.jpg");\n  }, 2000);\n};\nwindow.onload = onDomContentsLoaded;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMxQk4sUUFBUSxHQUFHckUsT0FBTztNQUVsQixJQUFJb0UsUUFBUSxDQUFDTyxLQUFLLEtBQUtOLFFBQVEsQ0FBQ00sS0FBSyxFQUFFO1FBQ3JDdEUsT0FBTyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO01BQ3ZCO0lBQ0YsQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0VBRUppRSxNQUFNLENBQUNqRixJQUFJLENBQUMsYUFBYSxDQUFDO0VBQzFCaUYsTUFBTSxDQUFDakYsSUFBSSxDQUFDLGFBQWEsQ0FBQztFQUMxQmlGLE1BQU0sQ0FBQ2pGLElBQUksQ0FBQyxhQUFhLENBQUM7RUFDMUJpRixNQUFNLENBQUNqRixJQUFJLENBQUMsYUFBYSxDQUFDO0VBQzFCaUYsTUFBTSxDQUFDakYsSUFBSSxDQUFDLGFBQWEsQ0FBQztFQUUxQnNGLFVBQVUsQ0FBQyxNQUFNO0lBQ2ZMLE1BQU0sQ0FBQ2pGLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDMUJpRixNQUFNLENBQUNqRixJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzFCaUYsTUFBTSxDQUFDakYsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUMxQmlGLE1BQU0sQ0FBQ2pGLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDMUJpRixNQUFNLENBQUNqRixJQUFJLENBQUMsYUFBYSxDQUFDO0VBQzVCLENBQUMsRUFBRSxJQUFJLENBQUM7QUFDVixDQUFDO0FBRUQrRCxNQUFNLENBQUN2RCxNQUFNLEdBQUdpRSxtQkFBbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AbWFzYXRvbWFraW5vL3RocmVlanMtdGV4dHVyZS1zd2l0Y2hpbmctbG9hZGVyLy4vZXNtL1RleHR1cmVTd2l0Y2hpbmdMb2FkZXIuanM/YzFiOSIsIndlYnBhY2s6Ly9AbWFzYXRvbWFraW5vL3RocmVlanMtdGV4dHVyZS1zd2l0Y2hpbmctbG9hZGVyLy4vZGVtb1NyYy9jb21tb24uanM/NDA2ZiIsIndlYnBhY2s6Ly9AbWFzYXRvbWFraW5vL3RocmVlanMtdGV4dHVyZS1zd2l0Y2hpbmctbG9hZGVyLy4vZGVtb1NyYy9kZW1vLmpzPzM5OTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FudmFzVGV4dHVyZSwgSW1hZ2VCaXRtYXBMb2FkZXIsIFRleHR1cmVMb2FkZXIsIH0gZnJvbSBcInRocmVlXCI7XG4vKipcbiAqIFRleHR1cmUgaW1hZ2UgbG9hZGVyLCBTd2l0Y2hpbmcgVGV4dHVyZUxvYWRlciBhbmQgSW1hZ2VCaXRtYXBMb2FkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXh0dXJlU3dpdGNoaW5nTG9hZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihtYW5hZ2VyKSB7XG4gICAgICAgIGlmIChUZXh0dXJlU3dpdGNoaW5nTG9hZGVyLmlzU3VwcG9ydEltYWdlQml0bWFwID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIFRleHR1cmVTd2l0Y2hpbmdMb2FkZXIuaXNTdXBwb3J0SW1hZ2VCaXRtYXAgPVxuICAgICAgICAgICAgICAgIHR5cGVvZiBjcmVhdGVJbWFnZUJpdG1hcCAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVRleHR1cmVTd2l0Y2hpbmdMb2FkZXIuaXNTdXBwb3J0SW1hZ2VCaXRtYXApIHtcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZUxvYWRlciA9IG5ldyBUZXh0dXJlTG9hZGVyKG1hbmFnZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbWFnZUJpdG1hcExvYWRlciA9IG5ldyBJbWFnZUJpdG1hcExvYWRlcihtYW5hZ2VyKTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VCaXRtYXBMb2FkZXIuc2V0T3B0aW9ucyh7IGltYWdlT3JpZW50YXRpb246IFwiZmxpcFlcIiB9KTsgLy9UbyBmaW5kIHRoZSBzYW1lIHJlc3VsdCBUZXh0dXJlTG9hZGVyIGFuZCBJbWFnZUJpdG1hcExvYWRlci5cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2FkIGltYWdlIGFzIFRleHR1cmUgb3IgQ2FudmFzVGV4dHVyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB1cmxcbiAgICAgKiBAcGFyYW0gb3B0aW9uXG4gICAgICogQHJldHVybiBQcm9taXNlPFRleHR1cmU+IFRleHR1cmUgb3IgQ2FudmFzVGV4dHVyZVxuICAgICAqL1xuICAgIGxvYWQodXJsLCBvcHRpb24pIHtcbiAgICAgICAgaWYgKG9wdGlvbiA9PSBudWxsKSB7XG4gICAgICAgICAgICBvcHRpb24gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVGV4dHVyZVN3aXRjaGluZ0xvYWRlci5pc1N1cHBvcnRJbWFnZUJpdG1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZEltYWdlQml0bWFwKHVybCwgb3B0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkVGV4dHVyZSh1cmwsIG9wdGlvbik7XG4gICAgfVxuICAgIGxvYWRJbWFnZUJpdG1hcCh1cmwsIG9wdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb25sb2FkID0gKGltYWdlQml0bWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dHVyZSA9IG5ldyBDYW52YXNUZXh0dXJlKGltYWdlQml0bWFwKTtcbiAgICAgICAgICAgICAgICBUZXh0dXJlU3dpdGNoaW5nTG9hZGVyLnNldFRleHR1cmVPcHRpb25zKHRleHR1cmUsIG9wdGlvbi5jYW52YXNUZXh0dXJlT3B0aW9uKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRleHR1cmUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChvcHRpb24uaW1hZ2VCaXRtYXBPcHRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlQml0bWFwTG9hZGVyLnNldE9wdGlvbnMob3B0aW9uLmltYWdlQml0bWFwT3B0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW1hZ2VCaXRtYXBMb2FkZXIubG9hZCh1cmwsIG9ubG9hZCwgdW5kZWZpbmVkLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUZXh0dXJlU3dpdGNoaW5nTG9hZGVyIDogXCIpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsb2FkVGV4dHVyZSh1cmwsIG9wdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJlTG9hZGVyLmxvYWQodXJsLCAodGV4dHVyZSkgPT4ge1xuICAgICAgICAgICAgICAgIFRleHR1cmVTd2l0Y2hpbmdMb2FkZXIuc2V0SW1hZ2VCaXRtYXBPcHRpb25zKHRleHR1cmUsIG9wdGlvbi5pbWFnZUJpdG1hcE9wdGlvbik7XG4gICAgICAgICAgICAgICAgVGV4dHVyZVN3aXRjaGluZ0xvYWRlci5zZXRUZXh0dXJlT3B0aW9ucyh0ZXh0dXJlLCBvcHRpb24uY2FudmFzVGV4dHVyZU9wdGlvbik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0ZXh0dXJlKTtcbiAgICAgICAgICAgIH0sIHVuZGVmaW5lZCwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGV4dHVyZVN3aXRjaGluZ0xvYWRlciA6IFwiKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHNldFRleHR1cmVPcHRpb25zKHRleHR1cmUsIG9wdGlvbikge1xuICAgICAgICB0ZXh0dXJlLm1hcHBpbmcgPz89IG9wdGlvbj8ubWFwcGluZztcbiAgICAgICAgdGV4dHVyZS53cmFwUyA/Pz0gb3B0aW9uPy53cmFwUztcbiAgICAgICAgdGV4dHVyZS53cmFwVCA/Pz0gb3B0aW9uPy53cmFwVDtcbiAgICAgICAgdGV4dHVyZS5taW5GaWx0ZXIgPz89IG9wdGlvbj8ubWluRmlsdGVyO1xuICAgICAgICB0ZXh0dXJlLmZvcm1hdCA/Pz0gb3B0aW9uPy5mb3JtYXQ7XG4gICAgICAgIHRleHR1cmUudHlwZSA/Pz0gb3B0aW9uPy50eXBlO1xuICAgICAgICB0ZXh0dXJlLmFuaXNvdHJvcHkgPz89IG9wdGlvbj8uYW5pc290cm9weTtcbiAgICAgICAgdGV4dHVyZS5jb2xvclNwYWNlID0gb3B0aW9uPy5jb2xvclNwYWNlID8/IFwic3JnYlwiO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0SW1hZ2VCaXRtYXBPcHRpb25zKHRleHR1cmUsIGltYWdlQml0bWFwT3B0aW9uKSB7XG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gaW1hZ2VCaXRtYXBPcHRpb24/LmltYWdlT3JpZW50YXRpb247XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0ZXh0dXJlLmZsaXBZID0gb3JpZW50YXRpb24gPT09IFwiZmxpcFlcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW1hZ2VCaXRtYXBPcHRpb24/LnByZW11bHRpcGx5QWxwaGEgIT0gbnVsbClcbiAgICAgICAgICAgIHRleHR1cmUucHJlbXVsdGlwbHlBbHBoYSA9XG4gICAgICAgICAgICAgICAgaW1hZ2VCaXRtYXBPcHRpb24ucHJlbXVsdGlwbHlBbHBoYSA9PT0gXCJwcmVtdWx0aXBseVwiO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHtcbiAgQW1iaWVudExpZ2h0LFxuICBBeGVzSGVscGVyLFxuICBDb2xvcixcbiAgUGVyc3BlY3RpdmVDYW1lcmEsXG4gIFNjZW5lLFxuICBXZWJHTFJlbmRlcmVyLFxufSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTY2VuZSgpIHtcbiAgY29uc3Qgc2NlbmUgPSBuZXcgU2NlbmUoKTtcbiAgcmV0dXJuIHNjZW5lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdExpZ2h0KHNjZW5lKSB7XG4gIGNvbnN0IGFtYmllbnRMaWdodCA9IG5ldyBBbWJpZW50TGlnaHQoMHhmZmZmZmYsIDEuMCk7XG4gIHNjZW5lLmFkZChhbWJpZW50TGlnaHQpO1xuICByZXR1cm4gYW1iaWVudExpZ2h0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdENhbWVyYShzY2VuZSwgVywgSCkge1xuICBjb25zdCBjYW1lcmEgPSBuZXcgUGVyc3BlY3RpdmVDYW1lcmEoNDUsIFcgLyBILCAxLCA0MDApO1xuICBjYW1lcmEucG9zaXRpb24uc2V0KDAsIDAsIDEwMCk7XG4gIGNhbWVyYS51cGRhdGVNYXRyaXhXb3JsZChmYWxzZSk7XG4gIHNjZW5lLmFkZChjYW1lcmEpO1xuICByZXR1cm4gY2FtZXJhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdENvbnRyb2woY2FtZXJhLCByZW5kZXIpIHtcbiAgY29uc3QgY29udHJvbCA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyLmRvbUVsZW1lbnQpO1xuICBjb250cm9sLnVwZGF0ZSgpO1xuICByZXR1cm4gY29udHJvbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRSZW5kZXJlcihXLCBIKSB7XG4gIGNvbnN0IHJlbmRlck9wdGlvbiA9IHtcbiAgICBjYW52YXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2ViZ2wtY2FudmFzXCIpLFxuICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgfTtcbiAgY29uc3QgcmVuZGVyZXIgPSBuZXcgV2ViR0xSZW5kZXJlcihyZW5kZXJPcHRpb24pO1xuICByZW5kZXJlci5zZXRDbGVhckNvbG9yKG5ldyBDb2xvcigweDAwMDAwMCkpO1xuICByZW5kZXJlci5zZXRTaXplKFcsIEgpO1xuICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgcmV0dXJuIHJlbmRlcmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEhlbHBlcihzY2VuZSkge1xuICBjb25zdCBheGVzSGVscGVyID0gbmV3IEF4ZXNIZWxwZXIoMzApO1xuICBzY2VuZS5hZGQoYXhlc0hlbHBlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoY29udHJvbCwgcmVuZGVyZXIsIHNjZW5lLCBjYW1lcmEpIHtcbiAgY29uc3QgcmVuZGVyaW5nID0gKCkgPT4ge1xuICAgIGNvbnRyb2wudXBkYXRlKCk7XG4gICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJpbmcpO1xuICB9O1xuICByZW5kZXJpbmcoKTtcbn1cbiIsImltcG9ydCB7IFRleHR1cmVTd2l0Y2hpbmdMb2FkZXIgfSBmcm9tIFwiLi4vZXNtL2luZGV4LmpzXCI7XG5pbXBvcnQge1xuICBpbml0Q2FtZXJhLFxuICBpbml0Q29udHJvbCxcbiAgaW5pdEhlbHBlcixcbiAgaW5pdExpZ2h0LFxuICBpbml0UmVuZGVyZXIsXG4gIGluaXRTY2VuZSxcbiAgcmVuZGVyLFxufSBmcm9tIFwiLi9jb21tb24uanNcIjtcbmltcG9ydCB7IENhY2hlLCBNZXNoLCBNZXNoQmFzaWNNYXRlcmlhbCwgU3BoZXJlR2VvbWV0cnkgfSBmcm9tIFwidGhyZWVcIjtcblxuY29uc3QgVyA9IDY0MDtcbmNvbnN0IEggPSA0ODA7XG5cbmNvbnN0IG9uRG9tQ29udGVudHNMb2FkZWQgPSAoKSA9PiB7XG4gIGNvbnN0IHNjZW5lID0gaW5pdFNjZW5lKCk7XG4gIGluaXRMaWdodChzY2VuZSk7XG4gIGNvbnN0IGNhbWVyYSA9IGluaXRDYW1lcmEoc2NlbmUsIFcsIEgpO1xuICBjb25zdCByZW5kZXJlciA9IGluaXRSZW5kZXJlcihXLCBIKTtcbiAgY29uc3QgY29udHJvbCA9IGluaXRDb250cm9sKGNhbWVyYSwgcmVuZGVyZXIpO1xuICBpbml0SGVscGVyKHNjZW5lKTtcbiAgaW5pdFNwaGVyZShzY2VuZSk7XG4gIHJlbmRlcihjb250cm9sLCByZW5kZXJlciwgc2NlbmUsIGNhbWVyYSk7XG59O1xuXG5jb25zdCBpbml0U3BoZXJlID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IGdlbyA9IG5ldyBTcGhlcmVHZW9tZXRyeSgyMCwgMTYsIDE2KTtcbiAgY29uc3QgbWF0ID0gbmV3IE1lc2hCYXNpY01hdGVyaWFsKCk7XG4gIGNvbnN0IG1lc2ggPSBuZXcgTWVzaChnZW8sIG1hdCk7XG4gIHNjZW5lLmFkZChtZXNoKTtcblxuICBsZXQgdGV4dHVyZTE7XG4gIGxldCB0ZXh0dXJlMjtcblxuICBDYWNoZS5lbmFibGVkID0gdHJ1ZTtcbiAgY29uc3QgbG9hZGVyID0gbmV3IFRleHR1cmVTd2l0Y2hpbmdMb2FkZXIoKTtcbiAgbG9hZGVyXG4gICAgLmxvYWQoXCIuL2VhcnRoLmpwZ1wiLCB7IGltYWdlQml0bWFwT3B0aW9uOiB7IGltYWdlT3JpZW50YXRpb246IFwiZmxpcFlcIiB9IH0pXG4gICAgLnRoZW4oKHRleHR1cmUpID0+IHtcbiAgICAgIG1hdC5tYXAgPSB0ZXh0dXJlO1xuICAgICAgbWF0Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUubG9nKFwiMXN0IExvYWRcIik7XG4gICAgICBjb25zb2xlLmxvZyh0ZXh0dXJlLmltYWdlKTtcbiAgICAgIHRleHR1cmUxID0gdGV4dHVyZTtcblxuICAgICAgbG9hZGVyLmxvYWQoXCIuL2VhcnRoLmpwZ1wiKS50aGVuKCh0ZXh0dXJlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiMm5kIExvYWRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHR1cmUuaW1hZ2UpO1xuICAgICAgICB0ZXh0dXJlMiA9IHRleHR1cmU7XG5cbiAgICAgICAgaWYgKHRleHR1cmUxLmltYWdlID09PSB0ZXh0dXJlMi5pbWFnZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwic2hhcmUhXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICBsb2FkZXIubG9hZChcIi4vZWFydGguanBnXCIpO1xuICBsb2FkZXIubG9hZChcIi4vZWFydGguanBnXCIpO1xuICBsb2FkZXIubG9hZChcIi4vZWFydGguanBnXCIpO1xuICBsb2FkZXIubG9hZChcIi4vZWFydGguanBnXCIpO1xuICBsb2FkZXIubG9hZChcIi4vZWFydGguanBnXCIpO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGxvYWRlci5sb2FkKFwiLi9lYXJ0aC5qcGdcIik7XG4gICAgbG9hZGVyLmxvYWQoXCIuL2VhcnRoLmpwZ1wiKTtcbiAgICBsb2FkZXIubG9hZChcIi4vZWFydGguanBnXCIpO1xuICAgIGxvYWRlci5sb2FkKFwiLi9lYXJ0aC5qcGdcIik7XG4gICAgbG9hZGVyLmxvYWQoXCIuL2VhcnRoLmpwZ1wiKTtcbiAgfSwgMjAwMCk7XG59O1xuXG53aW5kb3cub25sb2FkID0gb25Eb21Db250ZW50c0xvYWRlZDtcbiJdLCJuYW1lcyI6WyJDYW52YXNUZXh0dXJlIiwiSW1hZ2VCaXRtYXBMb2FkZXIiLCJUZXh0dXJlTG9hZGVyIiwiVGV4dHVyZVN3aXRjaGluZ0xvYWRlciIsImNvbnN0cnVjdG9yIiwibWFuYWdlciIsImlzU3VwcG9ydEltYWdlQml0bWFwIiwidW5kZWZpbmVkIiwiY3JlYXRlSW1hZ2VCaXRtYXAiLCJ0ZXh0dXJlTG9hZGVyIiwiaW1hZ2VCaXRtYXBMb2FkZXIiLCJzZXRPcHRpb25zIiwiaW1hZ2VPcmllbnRhdGlvbiIsImxvYWQiLCJ1cmwiLCJvcHRpb24iLCJsb2FkSW1hZ2VCaXRtYXAiLCJsb2FkVGV4dHVyZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25sb2FkIiwiaW1hZ2VCaXRtYXAiLCJ0ZXh0dXJlIiwic2V0VGV4dHVyZU9wdGlvbnMiLCJjYW52YXNUZXh0dXJlT3B0aW9uIiwiaW1hZ2VCaXRtYXBPcHRpb24iLCJlcnIiLCJjb25zb2xlIiwibG9nIiwic2V0SW1hZ2VCaXRtYXBPcHRpb25zIiwibWFwcGluZyIsIndyYXBTIiwid3JhcFQiLCJtaW5GaWx0ZXIiLCJmb3JtYXQiLCJ0eXBlIiwiYW5pc290cm9weSIsImNvbG9yU3BhY2UiLCJvcmllbnRhdGlvbiIsImZsaXBZIiwicHJlbXVsdGlwbHlBbHBoYSIsIkFtYmllbnRMaWdodCIsIkF4ZXNIZWxwZXIiLCJDb2xvciIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwiU2NlbmUiLCJXZWJHTFJlbmRlcmVyIiwiT3JiaXRDb250cm9scyIsImluaXRTY2VuZSIsInNjZW5lIiwiaW5pdExpZ2h0IiwiYW1iaWVudExpZ2h0IiwiYWRkIiwiaW5pdENhbWVyYSIsIlciLCJIIiwiY2FtZXJhIiwicG9zaXRpb24iLCJzZXQiLCJ1cGRhdGVNYXRyaXhXb3JsZCIsImluaXRDb250cm9sIiwicmVuZGVyIiwiY29udHJvbCIsImRvbUVsZW1lbnQiLCJ1cGRhdGUiLCJpbml0UmVuZGVyZXIiLCJyZW5kZXJPcHRpb24iLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYW50aWFsaWFzIiwicmVuZGVyZXIiLCJzZXRDbGVhckNvbG9yIiwic2V0U2l6ZSIsInNldFBpeGVsUmF0aW8iLCJ3aW5kb3ciLCJkZXZpY2VQaXhlbFJhdGlvIiwiaW5pdEhlbHBlciIsImF4ZXNIZWxwZXIiLCJyZW5kZXJpbmciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJDYWNoZSIsIk1lc2giLCJNZXNoQmFzaWNNYXRlcmlhbCIsIlNwaGVyZUdlb21ldHJ5Iiwib25Eb21Db250ZW50c0xvYWRlZCIsImluaXRTcGhlcmUiLCJnZW8iLCJtYXQiLCJtZXNoIiwidGV4dHVyZTEiLCJ0ZXh0dXJlMiIsImVuYWJsZWQiLCJsb2FkZXIiLCJ0aGVuIiwibWFwIiwibmVlZHNVcGRhdGUiLCJpbWFnZSIsInNldFRpbWVvdXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///763\n')}},__webpack_module_cache__={},deferred;function __webpack_require__(Q){var U=__webpack_module_cache__[Q];if(void 0!==U)return U.exports;var F=__webpack_module_cache__[Q]={exports:{}};return __webpack_modules__[Q](F,F.exports,__webpack_require__),F.exports}__webpack_require__.m=__webpack_modules__,deferred=[],__webpack_require__.O=(Q,U,F,B)=>{if(!U){var e=1/0;for(n=0;n<deferred.length;n++){for(var[U,F,B]=deferred[n],I=!0,i=0;i<U.length;i++)(!1&B||e>=B)&&Object.keys(__webpack_require__.O).every((Q=>__webpack_require__.O[Q](U[i])))?U.splice(i--,1):(I=!1,B<e&&(e=B));if(I){deferred.splice(n--,1);var t=F();void 0!==t&&(Q=t)}}return Q}B=B||0;for(var n=deferred.length;n>0&&deferred[n-1][2]>B;n--)deferred[n]=deferred[n-1];deferred[n]=[U,F,B]},__webpack_require__.d=(Q,U)=>{for(var F in U)__webpack_require__.o(U,F)&&!__webpack_require__.o(Q,F)&&Object.defineProperty(Q,F,{enumerable:!0,get:U[F]})},__webpack_require__.o=(Q,U)=>Object.prototype.hasOwnProperty.call(Q,U),__webpack_require__.j=577,(()=>{var Q={577:0};__webpack_require__.O.j=U=>0===Q[U];var U=(U,F)=>{var B,e,[I,i,t]=F,n=0;if(I.some((U=>0!==Q[U]))){for(B in i)__webpack_require__.o(i,B)&&(__webpack_require__.m[B]=i[B]);if(t)var l=t(__webpack_require__)}for(U&&U(F);n<I.length;n++)e=I[n],__webpack_require__.o(Q,e)&&Q[e]&&Q[e][0](),Q[e]=0;return __webpack_require__.O(l)},F=self.webpackChunk_masatomakino_threejs_texture_switching_loader=self.webpackChunk_masatomakino_threejs_texture_switching_loader||[];F.forEach(U.bind(null,0)),F.push=U.bind(null,F.push.bind(F))})();var __webpack_exports__=__webpack_require__.O(void 0,[736],(()=>__webpack_require__(763)));__webpack_exports__=__webpack_require__.O(__webpack_exports__)})();