import { PerspectiveCamera } from 'three';

class MainCamera extends PerspectiveCamera {
  constructor() {
    super(60, window.innerWidth / window.innerHeight, 0.01, 10);

    this.position.z = 1;
  }
}

export default MainCamera;
