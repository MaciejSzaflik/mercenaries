import { SimplexNoise } from 'simplex-noise';
import { BoxBufferGeometry } from 'three';
import { Group, MeshLambertMaterial, Mesh} from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { HexGeometry, Hex, HexConfig } from '../Geometries/Hex.js'

export default class Terrain extends Group {
  constructor() {
    super();
    this.lastTimeStamp = 0
    this.simplexNoise = new SimplexNoise()

    this.config = new HexConfig(15)
		this.material = new MeshLambertMaterial( {color: 0xaaaaaaaa, wireframe: false} );
    this.size = 5
    this.fragmentCount = 10

    this.noiseDiff = 0.003
    this.yScale = 30

    this.terrainScale = 10
    this.offH = -100

    this.offset = 0
    this.creationQueue = []

    this.createFragment(0,0)
  }

  createFragment(q,r,s) {
    let geometries = []
    for(let q = -this.size; q <= this.size; q++) {
      for(let r = Math.max(-this.size, -q-this.size); r <= Math.min(this.size, -q+this.size);r++) {
          const pos = this.config.getPos(q,r)
          let h = (this.simplexNoise.noise2D(pos.x*this.noiseDiff, pos.y*this.noiseDiff) + 1)*this.yScale

          const hex = new Hex(q,r,-q-r,h,this.config)
          hex.position = pos

          geometries.push(hex.generateGeometry())
          this.add(mesh)
      }
    }

    const mesh = new Mesh(mergeBufferGeometries(geometries), this.material)
    this.add(mesh)
  }

  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  creationLoop() {
    if(this.creationQueue.length == 0)
      return

      let val = this.creationQueue.shift()

  }

  update(timeStamp){
    this.creationLoop()
  }
}
