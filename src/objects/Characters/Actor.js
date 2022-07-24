import { Group } from 'three';
import Cube from '../Geometries/Cube';

export default class Actor extends Group {
  constructor(behavior, time, position) {
    super();

    this.name = 'actor';

    this.add(new Cube(10,10,1, 0xffffff))
    this.lastTime = time;
    
    this.position.set(position.x, position.y, position.z);

    this.behavior = behavior;
    this.behavior.init(this);
  }

  update(time){
    if(this.behavior != null)
    {
      this.behavior.update(time - this.lastTime);
    }
    this.lastTime = time;
  }
}
