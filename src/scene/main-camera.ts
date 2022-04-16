import { PerspectiveCamera } from 'three';

class MainCamera extends PerspectiveCamera {
  constructor() {
    super(60, window.innerWidth / window.innerHeight, 0.01, 10000);

    this.position.z = 1;
    this.position.y = -0.4;
    this.rotation.x = 0.2;
  }
}

export default MainCamera;
