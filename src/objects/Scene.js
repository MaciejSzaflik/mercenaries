import { Group, LightShadow, REVISION } from 'three';

import Actor from './Characters/Actor.js';
import Human from './Characters/Human.js';
import TupTupBehavior from './Characters/TupTupBehavior.js';
import Terrain from './Terrain/Terrain.js';
import BasicLights from './Lights.js'


export default class SeedScene extends Group {
  constructor() {
		super();
		console.log( REVISION );

    this.add(new BasicLights())

    this.createTerrain()
    this.createActors();
  }

  createActors()
  {
    this.actors = [];
    for (let i = 0; i < 0; i++) {
      this.actors.push(new Human(new TupTupBehavior(), 0));
      this.add(this.actors[i]);
    }
  }

  createTerrain()
  {
    this.terrain = new Terrain()
    this.add(this.terrain);
  }

  update(timeStamp) {
    this.actors.forEach(actor => {
      actor.update(timeStamp);
    });
    
    this.terrain.update(timeStamp)
  }
}