import Behavior from './Behavior.js';
import { Vector3 } from 'three';

export default class BoidBehavior extends Behavior {

  init(boidGroup) {
    this.speed = 0.01;
    this.actor = actor;
    this.boidGroup = boidGroup;
  }

  update(delta) {
    if(this.boidGroup == null || this.boidGroup.boids == null)
      return;
    
    this.boidGroup.boids.forEach(actor => {
      let distance = actor.position.distanceTo(this.actor.position);
      console.log(distance);
    });
  
  //this.actor.translateOnAxis(this.boidGroup.groupVector, this.speed * delta);

    this.groupVector = new Vector3(0,0,0);
  }
}