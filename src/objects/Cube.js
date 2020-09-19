import { Group, BoxBufferGeometry,MeshBasicMaterial, Mesh} from 'three';

export default class Cube extends Group {
  constructor() {
    super();

    this.name = 'cube';

    let geometry = new BoxBufferGeometry( 1, 1, 1 );
		let material = new MeshBasicMaterial( {color: 0x00ff00} );
		let cube = new Mesh( geometry, material );
		this.add(cube)
  }
}
