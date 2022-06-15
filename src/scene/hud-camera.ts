import { OrthographicCamera } from "three";

/**
 * HUD Camera is an orthographic camera used to render
 * hud elements such as text and menus
 */
class HudCamera extends OrthographicCamera {
  constructor() {
    super(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      1000
    );

    this.position.z = 1000;
  }

  updateWindowSize() {
    this.left = window.innerWidth / -2;
    this.right = window.innerWidth / 2;
    this.top = window.innerHeight / 2;
    this.bottom = window.innerHeight / -2;
  }
}

export default HudCamera;
