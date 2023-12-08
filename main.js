import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import moonTexture from "./assets/moon-texture.jpg";
import moonDisplacementMap from "./assets/moon-displacement.jpg";

const scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry(3, 64, 64);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(moonTexture);
const displacementMap = textureLoader.load(moonDisplacementMap);

// add material
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: texture,
  displacementMap: displacementMap,
  displacementScale: 0.1,
  bumpMap: displacementMap,
  bumpScale: 3,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// sizes
let w;
if (window.innerWidth < 800) {
  w = window.innerWidth;
} else {
  w = window.innerWidth / 2;
}
let h = window.innerHeight / 2;

// light
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(100, 10, 5);
scene.add(light);

// camera
const camera = new THREE.PerspectiveCamera(20, w / h);
camera.position.z = 20;
scene.add(camera);

// renderer
const canvas1 = document.querySelector("#webgl1");
const renderer1 = new THREE.WebGLRenderer({
  canvas: canvas1, antialias: true
});
renderer1.setSize(w, h);
renderer1.setClearColor(0x0f0e0e, 0);
renderer1.render(scene, camera);

const canvas2 = document.querySelector("#webgl2");
const renderer2 = new THREE.WebGLRenderer({
  canvas: canvas2, antialias: true
});
renderer2.setSize(w, h);
renderer2.setClearColor(0x0f0e0e, 0);
renderer2.render(scene, camera);

// orbit controls
const controls1 = new OrbitControls(camera, canvas1);
controls1.enableDamping = true;
controls1.enablePen = false;
controls1.enableZoom = false;

const controls2 = new OrbitControls(camera, canvas2);
controls2.enableDamping = true;
controls2.enablePen = false;
controls2.enableZoom = false;

// window resize
window.addEventListener("resize", () => {
  if (window.innerWidth < 800) {
    w = window.innerWidth;
  } else {
    w = window.innerWidth;
  }
  h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer1.setSize(w, h);
  renderer2.setSize(w, h);
});

//animations
const loop = () => {
  mesh.rotation.y += 0.003;
  renderer1.render(scene, camera);
  renderer2.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
