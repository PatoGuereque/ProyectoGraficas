import { GameObject } from "../gameobject";
import GameWindow from "../../../scene/window";
import { OrbitControls } from "../../../imports";

/**
 * Orbit controls used for debugging
 * Enables an interactive scene to freely move around
 */
export class OrbitControlsObject extends GameObject {
  private controls: OrbitControls;

  constructor() {
    super();
  }

  public init(window: GameWindow): void {
    this.controls = new OrbitControls(
      window.getMainCamera(),
      window.getRenderer().domElement
    );
    this.controls.update();
    super.init(window);
  }

  public update(time: number, gameWindow: GameWindow): void {
    super.update(time, gameWindow);
    this.controls.update();
  }
}
