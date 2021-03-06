import Behavior from './Behavior.js';
import { Vector3 } from 'three';

export default class TupTupBehavior extends Behavior {

  offset = 10;
  speed = 0.03;

  constructor(speed, offset) {
    super();
    this.speed = speed;
    this.offset = offset;
  }

  init(actor) {
    this.actor = actor;
    this.startPos = actor.position;
    this.minX = actor.position.x - this.offset;
    this.maxX = actor.position.x + this.offset;
    this.right = true;
  }

  update(delta) {

    let amount = Math.min(this.offset, this.speed*delta);

    if(this.right)
      this.actor.translateX(amount);
    else
      this.actor.translateX(-amount);

    if(this.actor.position.x > this.maxX)
      this.right = false;
    
    if(this.actor.position.x < this.minX)
      this.right = true;

  }
}