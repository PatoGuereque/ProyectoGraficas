import { PerspectiveCamera } from "three";

class MainCamera extends PerspectiveCamera {
  constructor() {
    super(30, window.innerWidth / window.innerHeight, 0.01, 10000);

    this.position.set(7, -31, 13);
    this.rotation.x = 0.02;
    this.rotation.y = 0.37;
    this.rotation.z = 0;
  }
}

export default MainCamera;
