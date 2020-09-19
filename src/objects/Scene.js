import { Group, REVISION } from 'three';

import Actor from './Characters/Actor.js';
import Human from './Characters/Human.js';
import TupTupBehavior from './Characters/TupTupBehavior.js';



export default class SeedScene extends Group {
  constructor() {
		super();
		console.log( REVISION );

    this.createActors();
  }

  createActors()
  {
    this.actors = [];
    for (let i = 0; i < 1; i++) {
      this.actors.push(new Human(new TupTupBehavior(), 0));
      this.add(this.actors[i]);
    }
  }

  update(timeStamp) {
    this.actors.forEach(actor => {
      actor.update(timeStamp);
    });
    
  }
}