import { PerspectiveCamera } from "three";

/**
 * Main camera is a perspective camera with a FOV of 30
 */
class MainCamera extends PerspectiveCamera {
  constructor() {
    super(30, window.innerWidth / window.innerHeight, 0.01, 10000);

    this.position.set(7, 1, 13);
  }

  public visibleHeightAtZDepth(depth: number) {
    // compensate for cameras not positioned at z=0
    const cameraOffset = this.position.z;
    if (depth < cameraOffset) depth -= cameraOffset;
    else depth += cameraOffset;

    // vertical fov in radians
    const vFOV = (this.fov * Math.PI) / 180;

    // Math.abs to ensure the result is always positive
    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  }

  public visibleWidthAtZDepth(depth: number) {
    const height = this.visibleHeightAtZDepth(depth);
    return height * this.aspect;
  }
}

export default MainCamera;
