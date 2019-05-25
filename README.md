# threejs-texture-switching-loader

Texture image loader util for three.js, Switching TextureLoader and ImageBitmapLoader.

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Demo

[Demo Page](https://masatomakino.github.io/threejs-texture-switching-loader/demo/)

## Getting Started

### Install

threejs-texture-switching-loader depend on [three.js](https://threejs.org/)

```bash
npm install three --save-dev
```

and

```bash
npm install https://github.com/MasatoMakino/threejs-texture-switching-loader.git --save-dev
```

### Import

threejs-texture-switching-loader is composed of ES6 modules and TypeScript d.ts files.

At first, import classes.

```js
import { TextureSwitchingLoader } from "threejs-texture-switching-loader";
```

### Load images

```js
const geo = new SphereGeometry(20, 16, 16);
const mat = new MeshBasicMaterial();
const mesh = new Mesh(geo, mat);
scene.add(mesh);

const loader = new TextureSwitchingLoader();
loader.load("./earth.jpg").then(texture => {
  mat.map = texture;
  mat.needsUpdate = true; // <- on changed map, you must set needsUpdate.
});
```

or

```js
const geo = new SphereGeometry(20, 16, 16);

const loader = new TextureSwitchingLoader();
loader.load("./earth.jpg").then(texture => {
  const mat = new MeshBasicMaterial({ map: texture });
  const mesh = new Mesh(geo, mat);
  scene.add(mesh);
});
```

Like [ImageBitmapLoader](https://threejs.org/docs/#api/en/loaders/ImageBitmapLoader),　TextureSwitchingLoader.load() return Promise Object.

## API Documents

[API documents](https://masatomakino.github.io/threejs-texture-switching-loader/api/)

## License

threejs-texture-switching-loader is [MIT licensed](LICENSE).
