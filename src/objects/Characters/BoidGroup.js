
import { Vector3 } from 'three';

export default class BoidGroup extends Behavior {

  init(actors) {
    this.boids = actors;
    this.groupVector = new Vector3(0,0,0);
    this.separationV = 100;
    this.aligmentV = 100;
    this.coherenceV = 100;
  }

  addActor(actor)
  {
    this.boids.push(actor);
  }

  update(delta) {
    
  }
}