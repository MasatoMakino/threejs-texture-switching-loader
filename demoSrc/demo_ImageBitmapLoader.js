/**
 * ImageBitmapLoaderを直接利用した場合のデモ。
 * サポートされていないブラウザーではエラーが発生する。
 * また、上下反転の補正は行われない。
 */

import {
  initCamera,
  initControl,
  initHelper,
  initLight,
  initRenderer,
  initScene,
  render,
} from "./common.js";
import {
  CanvasTexture,
  ImageBitmapLoader,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
} from "three";

const W = 640;
const H = 480;

const onDomContentsLoaded = () => {
  const scene = initScene();
  initLight(scene);
  const camera = initCamera(scene, W, H);
  const renderer = initRenderer(W, H);
  const control = initControl(camera, renderer);
  initHelper(scene);
  initSphere(scene);
  render(control, renderer, scene, camera);
};

const initSphere = (scene) => {
  const geo = new SphereGeometry(20, 16, 16);
  const mat = new MeshBasicMaterial();
  const mesh = new Mesh(geo, mat);
  scene.add(mesh);

  const loader = new ImageBitmapLoader();
  loader.load(
    "./earth.jpg",

    function (imageBitmap) {
      const texture = new CanvasTexture(imageBitmap);
      mat.map = texture;
      mat.needsUpdate = true;
      console.log(texture);
    },

    undefined,

    function (err) {
      console.log("An error happened", err);
    }
  );
};

window.onload = onDomContentsLoaded;
