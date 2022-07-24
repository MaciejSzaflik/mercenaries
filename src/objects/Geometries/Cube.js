import { Group, BoxBufferGeometry,MeshBasicMaterial, Mesh} from 'three';

export default class Cube extends Group {
  constructor(x,y,z, color) {
    super();

    this.name = 'cube';

    let geometry = new BoxBufferGeometry( x, y, z );
		let material = new MeshBasicMaterial( {color: color} );
		let cube = new Mesh( geometry, material );
		this.add(cube)
  }
}
