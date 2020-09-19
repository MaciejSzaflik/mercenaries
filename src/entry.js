/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */

import { WebGLRenderer, OrthographicCamera, Scene, Vector3 } from 'three';
import * as THREE from 'three';
import SeedScene from './objects/Scene.js';


const scene = new Scene();
let width = window.innerWidth;
let height = window.innerHeight;

const camera = new OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();

// scene
scene.add(seedScene);
// camera
camera.position.set(0,0,5);
camera.lookAt(new Vector3(0,0,0));

const OrbitControls = require('three-orbit-controls')(THREE);
var controls = new OrbitControls( camera, renderer.domElement );
controls.update();

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x303040, 1);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
	seedScene.update && seedScene.update(timeStamp);
	
	controls.update();
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

