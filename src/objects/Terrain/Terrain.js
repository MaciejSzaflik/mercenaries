import { SimplexNoise } from 'simplex-noise';
import { Group, BoxBufferGeometry, MeshLambertMaterial, Mesh} from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export default class Terrain extends Group {
  constructor() {
    super();
    this.lastTimeStamp = 0
    this.simplexNoise = new SimplexNoise()

    
		this.material = new MeshLambertMaterial( {color: 0xaaaaaaaa} );
    this.size = 50
    this.fragmentCount = 10

    this.noiseDiff = 100
    this.yScale = 20

    this.terrainScale = 10 
    this.offH = -100

    this.offset = 0
    this.creationQueue = []
    
    for(let i = 0; i < this.fragmentCount; i++) {
      for(let j = 0; j < this.fragmentCount; j++) { 
        this.creationQueue.push({
          x: i*this.size,
          y:j * this.size
        })
      }
    }
  }

  createFragment(x, y) {
    let geometries = []
    for(let i = x; i < this.size + x; i++) {
      for(let j = y; j < this.size + y; j++) {
        let h = (this.simplexNoise.noise2D(i/this.noiseDiff, j/this.noiseDiff) + 1)*this.yScale
        let geometry = new BoxBufferGeometry(this.terrainScale, h, this.terrainScale);
        geometry.translate((this.terrainScale/2 - i)*this.terrainScale, h/2 + this.offH, j*this.terrainScale)
        geometries.push(geometry)
      }
    }

    let newGeometry = mergeBufferGeometries(geometries)
    let terrain = new Mesh(newGeometry, this.material)
    this.add(terrain)
  }

  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  creationLoop() {
    if(this.creationQueue.length == 0)
      return
    
      let val = this.creationQueue.shift()
      this.createFragment(val.x, val.y)
  }

  update(timeStamp){
    this.creationLoop()
  }
}
