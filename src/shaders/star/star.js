import vertexShader from './star.vert';
import fragmentShader from './star.frag';

export default class Star {
	constructor(){
		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;
	}
}