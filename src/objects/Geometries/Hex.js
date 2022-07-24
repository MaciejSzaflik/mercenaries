import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { Float32BufferAttribute } from 'three/src/core/BufferAttribute.js';
import { Vector3 } from 'three/src/math/Vector3.js';

class HexConfig {
  constructor(scale) {
    this.scale = scale;
    this.sqrt3 = Math.sqrt(3) * this.scale;
    this.sqrt3H = this.sqrt3/2.0;
    this.hWidth = this.sqrt3;
    this.hHeight = this.scale * 2;
    this.hDiffH = this.hHeight * 0.75;
    this.hDiffW = this.sqrt3H;
    this.hHeightQ = this.hHeight * 0.25
    this.one = 1 * this.scale

    this.v = [
      new Vector3(0,0,0),
      new Vector3(0,0,this.one),
      new Vector3(this.sqrt3H,0,this.hHeightQ),
      new Vector3(this.sqrt3H,0,-this.hHeightQ),
      new Vector3(0,0,-this.one),
      new Vector3(-this.sqrt3H,0,-this.hHeightQ),
      new Vector3(-this.sqrt3H,0,this.hHeightQ)
    ]
  }

  getPos(q, r) {
    return new Vector3(
      (q + (r - (r & 1)) / 2)*this.hWidth + this.hDiffW*(r & 1),
      r*this.hDiffH,
      0
    );
  }
}

class Hex {
  constructor(q, r, s, height, config) {
    this.q = q
    this.r = r
    this.s = s
    this.height = height
    this.config = config
  }ą

  getPos() {
    return this.config.getPos(this.q, this.r)
  }

  generateGeometry() {
    const geo = new HexGeometry(this.config, this.height)
    geo.translate(this.position.x,0,this.position.y)
    return geo
  }
}

class HexGeometry extends BufferGeometry {
  constructor(config, height = 1) {
		super();

		this.type = 'HexGeometry';

		this.parameters = {
			height: height,
    };

		// buffers

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

    //build top
    config.v.map((vector) => this.addVectorToArray(vector.clone().setY(height), vertices))

    const addHexIndices = (offset) => {
      indices.push(0 + offset,1 + offset,2 + offset)
      indices.push(0 + offset,2 + offset,3 + offset)
      indices.push(0 + offset,3 + offset,4 + offset)
      indices.push(0 + offset,4 + offset,5 + offset)
      indices.push(0 + offset,5 + offset,6 + offset)
      indices.push(0 + offset,6 + offset,1 + offset)
    }
    addHexIndices(0)

    for (let i = 0; i < config.v.length; i++) {
      normals.push( 0,1,0 ,0,1,0 ,0,1,0 );
      uvs.push( 0,0 )
    }

    this.addGroup(0, config.v.length, 0)

    //sides

    config.v.map((vector, index) => {
      if(index != 0) {
         this.addVectorToArray(vector, vertices);
        }
      })
    config.v.map((vector, index) => {
      if(index != 0) {
        this.addVectorToArray(vector.clone().setY(height), vertices);
      }
    })

    for (let i = 0; i < 6; i++) {
      indices.push(13 + i, 7 + i, 7 + (1 + i)%6)
      indices.push(13 + (1 + i)%6, 13 + i, 7 + (1 + i)%6)
    }

		this.setIndex( indices );
		this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
    this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

    this.computeVertexNormals()
  }

  addVectorToArray(vector, array) {
    array.push( vector.x, vector.y, vector.z)
  }

}

export { HexGeometry, Hex, HexConfig};
