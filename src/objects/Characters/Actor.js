import { Group, BoxBufferGeometry,MeshBasicMaterial, Mesh} from 'three';

export default class Actor extends Group {
  constructor(behavior, time) {
    super();

    this.name = 'actor';

    let geometry = new BoxBufferGeometry( 10, 10, 1 );
		let material = new MeshBasicMaterial( {color: 0xffffff} );
		let cube = new Mesh( geometry, material );
    this.add(cube);
    this.lastTime = time;
    
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
