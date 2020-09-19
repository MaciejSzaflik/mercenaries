import Behavior from './Behavior.js';
import { Vector3 } from 'three';

export default class TupTupBehavior extends Behavior {

  init(actor) {
    this.speed = 0.003;
    this.actor = actor;
    this.startPos = actor.position;
    this.minX = actor.position.x - 2;
    this.maxX = actor.position.x + 2;
    this.right = true;
  }

  update(delta) {
    if(this.right)
      this.actor.translateX(this.speed * delta);
    else
      this.actor.translateX(-this.speed * delta);

    if(this.actor.position.x > this.maxX)
      this.right = false;
    
    if(this.actor.position.x < this.minX)
      this.right = true;

  }
}