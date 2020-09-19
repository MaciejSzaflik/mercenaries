import { Group, BufferGeometry, ShaderMaterial, Vector3, Color, TextureLoader, Points, BufferAttribute, AdditiveBlending} from 'three';
import StarData from './StarData.js';
import Star from '../shaders/star/star.js';

export default class Particles extends Group {
  constructor() {
    super();
		
		this.name = 'particles';
		
		this.data = new StarData();

		let additionalRandom = 0;
		for(let i = 0;i <additionalRandom;i++)
		{
			this.data.starData.push(
				{
					ObjectID : i,
					Longitude : Math.random()*720 - 360,
					Latitude : Math.random()*720 - 360,
					Distance : Math.random()*2200 + 200,
					Name : "random",
					Diameter : Math.random()*5
				}
			)
		}

		let particleCount = this.data.starData.length;

		let positions = new Float32Array( particleCount * 3 );
		let colors = new Float32Array( particleCount * 3 );
		let sizes = new Float32Array( particleCount );
		this.velocity = new Float32Array( particleCount );
		this.axises = [];

		let starShader = new Star();
		let material = new ShaderMaterial( {
			uniforms: {
				color: { value: new Color( 0xFFFFFF ) },
				pointTexture: { value: new TextureLoader().load( "circle.png" ) }
			},
			vertexShader: starShader.vertexShader,
			fragmentShader: starShader.fragmentShader,

			depthTest: false,
			transparent: true
		} );

		let mul = Math.PI / 180.0;
		let color = new Color( 0xffffff );
		let particle = new Vector3();

		for (let p = 0; p < particleCount; p++) {
			let R = this.data.starData[p].Distance;
			let size = this.data.starData[p].Diameter;
			if(R < 50)
				R = Math.random()*1000 + 200;

			let cosLat = Math.cos(this.data.starData[p].Latitude * mul);
			let sinLat = Math.sin(this.data.starData[p].Latitude  * mul);
			let cosLon = Math.cos(this.data.starData[p].Longitude * mul);
			let sinLon = Math.sin(this.data.starData[p].Longitude * mul);

			particle.x = R * cosLat * cosLon;
			particle.y = R * cosLat * sinLon;
			particle.z = R * sinLat;
			let r = Math.min(1,Math.max(10/size, 0.2));
			let g = Math.min(1,Math.max(100/size, 0.2));
			let b = Math.min(1,Math.max(200/size, 0.2));

			color.setRGB(r,g, b);

			particle.toArray( positions, p * 3 );
			color.toArray( colors, p * 3 );
			if(size > 10)
				sizes[p] = size;
			else
				sizes[p] = size*10 + 2;
			this.axises.push(new Vector3(Math.random()*0.2 - 0.2,Math.random()*0.2 - 0.2,Math.random()));
			this.velocity[p] = ((0.01)*R*0.001)/Math.max(1,(sizes[p]*0.1));

			this.data.starData[p].Diameter = sizes[p];
		}
		this.particles = new BufferGeometry();
		this.particles.setAttribute('position', new BufferAttribute( positions, 3 ));
		this.particles.setAttribute('customColor', new BufferAttribute( colors, 3 ));
		this.particles.setAttribute('size',  new BufferAttribute( sizes, 1 ));

		let particleSystem = new Points(this.particles, material);

		this.add(particleSystem);
	}

	moveFrame()
	{
		let time = Date.now() * 0.005;

		let sizes = this.particles.attributes.size.array;
		for ( let i = 0; i < sizes.length; i ++ ) {
			let distorition = Math.min(5,Math.max(this.data.starData[i].Diameter,1));
			sizes[ i ] =(this.data.starData[i].Diameter +  10 *Math.sin(  i + time/distorition) );

		}
		let positionsArray = this.particles.attributes.position.array;
		let pos = new Vector3(0,0,0);
		let axis = new Vector3(0,0,1);
		for(let i = 0; i < positionsArray.length; i+=3)
		{
			pos.x = positionsArray[i];
			pos.y = positionsArray[i+1];
			pos.z = positionsArray[i+2];
			pos.applyAxisAngle(this.axises[i/3], this.velocity[i/3]);
			positionsArray[i] = pos.x;
			positionsArray[i+1] = pos.y;
			positionsArray[i+2] = pos.z;
		}

		this.particles.attributes.size.needsUpdate = true;
		this.particles.attributes.position.needsUpdate = true;
	}

}
