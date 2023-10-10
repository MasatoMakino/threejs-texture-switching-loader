import { TextureSwitchingLoader } from "../esm/index.js";
import {
  initCamera,
  initControl,
  initHelper,
  initLight,
  initRenderer,
  initScene,
  render,
} from "./common.js";
import { Cache, Mesh, MeshBasicMaterial, SphereGeometry } from "three";

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

  let texture1;
  let texture2;

  Cache.enabled = true;
  const loader = new TextureSwitchingLoader();
  loader
    .load("./earth.jpg", { imageBitmapOption: { imageOrientation: "flipY" } })
    .then((texture) => {
      mat.map = texture;
      mat.needsUpdate = true;
      console.log("1st Load");
      console.log(texture.image);
      texture1 = texture;

      loader.load("./earth.jpg").then((texture) => {
        console.log("2nd Load");
        console.log(texture.image);
        texture2 = texture;

        if (texture1.image === texture2.image) {
          console.log("share!");
        }
      });
    });

  loader.load("./earth.jpg");
  loader.load("./earth.jpg");
  loader.load("./earth.jpg");
  loader.load("./earth.jpg");
  loader.load("./earth.jpg");

  setTimeout(() => {
    loader.load("./earth.jpg");
    loader.load("./earth.jpg");
    loader.load("./earth.jpg");
    loader.load("./earth.jpg");
    loader.load("./earth.jpg");
  }, 2000);
};

window.onload = onDomContentsLoaded;
