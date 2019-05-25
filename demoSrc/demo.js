import { TextureSwitchingLoader } from "../bin/index";
import {
  initScene,
  initLight,
  initCamera,
  initControl,
  initRenderer,
  initHelper,
  render
} from "./common";
import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";

const W = 640;
const H = 480;

const onDomContentsLoaded = () => {
  const scene = initScene();
  initLight(scene);
  const camera = initCamera(scene, W, H);
  const renderer = initRenderer(W, H);
  const control = initControl(camera);
  initHelper(scene);
  initSphere(scene);
  render(control, renderer, scene, camera);
};

const initSphere = scene => {
  const geo = new SphereGeometry(20, 16, 16);
  const mat = new MeshBasicMaterial();
  const mesh = new Mesh(geo, mat);
  scene.add(mesh);

  const loader = new TextureSwitchingLoader();
  loader
    .load("./earth.jpg", { imageBitmapOption: { imageOrientation: "flipY" } })
    .then(texture => {
      mat.map = texture;
      mat.needsUpdate = true;
      console.log(texture);
    });
};

window.onload = onDomContentsLoaded;
