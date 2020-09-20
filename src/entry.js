/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */

import { WebGLRenderer, OrthographicCamera, Scene, Vector3, Vector2, Raycaster } from 'three';
import * as THREE from 'three';
import SeedScene from './objects/Scene.js';


const scene = new Scene();
let width = window.innerWidth;
let height = window.innerHeight;

const mouse = new Vector3(0,0,0);
const camera = new OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();
const raycaster = new Raycaster(); 

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
renderer.setClearColor(0xd1b384, 1);

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
document.addEventListener( 'mousedown', onDocumentMouseDown, false );

function onDocumentMouseDown( event ) 
{
	
  mouse.set(
    (event.clientX / window.innerWidth) * 2 - 1,
    - (event.clientY / window.innerHeight) * 2 + 1,
    0
  );
  mouse.unproject(camera);

	console.log("Click. " + mouse.x + " " + mouse.y);

	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	//raycaster.setFromCamera( mouse, camera ); 

	// create an array containing all objects in the scene with which the ray intersects
	//var intersects = ray.intersectObjects( targetList );
	
	// if there is one (or more) intersections
	/*if ( intersects.length > 0 )
	{
		console.log("Hit @ " + toString( intersects[0].point ) );
		// change the color of the closest face.
		intersects[ 0 ].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 ); 
		intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
	}*/

}


