/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, GridHelper } from 'three';
import * as THREE from 'three';
import Stats from 'stats.js'
import SeedScene from './objects/Scene.js';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js';

let controls;
const scene = new Scene();
let width = window.innerWidth;
let height = window.innerHeight;

const camera =  new PerspectiveCamera( 45, width / height, 1, 10000 );
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();

// scene
scene.add(seedScene);
// camera
camera.position.set(-2,0,-100);
camera.lookAt(new Vector3(0,-40,0));

controls = new MapControls( camera, renderer.domElement );
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;

controls.minDistance = 0;
controls.maxDistance = 500;

controls.maxPolarAngle = Math.PI / 2;



// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x303040, 1);

var stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  stats.begin();

  renderer.render(scene, camera);
	seedScene.update && seedScene.update(timeStamp);
	
  controls.update();

  stats.end();

  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => { 
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );

