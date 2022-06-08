# threejs-texture-switching-loader

> Texture image loader util for three.js, Switching TextureLoader and ImageBitmapLoader.

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![Maintainability](https://api.codeclimate.com/v1/badges/1fda6a0f5c2e057085ae/maintainability)](https://codeclimate.com/github/MasatoMakino/threejs-texture-switching-loader/maintainability)

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=MasatoMakino&repo=threejs-texture-switching-loader)](https://github.com/MasatoMakino/threejs-texture-switching-loader)

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
npm install @masatomakino/threejs-texture-switching-loader --save-dev
```

### Import

At first, import classes.

```js
import { TextureSwitchingLoader } from "@masatomakino/threejs-texture-switching-loader";
```

### Load images

```js
const geo = new SphereGeometry(20, 16, 16);
const mat = new MeshBasicMaterial();
const mesh = new Mesh(geo, mat);
scene.add(mesh);

const loader = new TextureSwitchingLoader();
loader.load("./earth.jpg").then((texture) => {
  mat.map = texture;
  mat.needsUpdate = true; // <- on changed map, you must set needsUpdate.
});
```

or

```js
const geo = new SphereGeometry(20, 16, 16);

const loader = new TextureSwitchingLoader();
loader.load("./earth.jpg").then((texture) => {
  const mat = new MeshBasicMaterial({ map: texture });
  const mesh = new Mesh(geo, mat);
  scene.add(mesh);
});
```

Like [ImageBitmapLoader](https://threejs.org/docs/#api/en/loaders/ImageBitmapLoader),　 TextureSwitchingLoader.load() return Promise object.

## API Documents

[API documents](https://masatomakino.github.io/threejs-texture-switching-loader/api/)

## License

[MIT license](LICENSE).
