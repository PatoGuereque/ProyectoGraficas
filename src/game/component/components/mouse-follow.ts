import { Group, Vector3 } from "three";
import GameWindow from "../../../scene/window";
import { GameObject } from "../../object/gameobject";
import { Component } from "../component";
import { ComponentType } from "../types";

// stores the current transformed mouse x and y position
let mousePos = new Vector3();
const modelOffset = new Vector3(0, 0.05, 0);

// prevent floor clipping
const floor = new Vector3(-100, 0.25, -100);
const movementSpeed = 0.05;

// now handle the mousemove event
const handleMouseMove = (event: MouseEvent) => {
  event.preventDefault();

  // here we are converting the mouse position value received
  // to a normalized value varying between -1 and 1;
  // this is the formula for the horizontal axis:
  const tx = -1 + (event.clientX / window.innerWidth) * 2;

  // for the vertical axis, we need to inverse the formula
  // because the 2D y-axis goes the opposite direction of the 3D y-axis
  const ty = 1 - (event.clientY / window.innerHeight) * 2;

  mousePos = new Vector3(tx, ty, 0.5);
};

/**
 * Makes the current object follow the mouse cursor
 */
export class MouseFollowComponent extends Component {
  private model: Group;

  constructor(model: Group) {
    super();
    this.model = model;
  }

  public init(): void {
    document.addEventListener("mousemove", handleMouseMove, false);
  }

  public update(
    _delta: number,
    gameWindow: GameWindow,
    _gameObject: GameObject
  ): void {
    const vector = mousePos.clone();
    vector.unproject(gameWindow.getMainCamera());
    const dir = vector.sub(gameWindow.getMainCamera().position).normalize();
    const distance = -gameWindow.getMainCamera().position.z / dir.z;
    const pos = gameWindow
      .getMainCamera()
      .position.clone()
      .add(dir.multiplyScalar(distance))
      .max(floor) // prevent floor clipping
      .sub(this.model.position) // get model position offset to gradually move it
      .sub(modelOffset) // model offset from the center of the mouse
      .multiplyScalar(movementSpeed);

    this.model.position.add(pos);
  }

  public destroy(_window: GameWindow, _gameObject: GameObject): void {
    document.removeEventListener("mousemove", handleMouseMove);
  }

  public getComponentType(): ComponentType {
    return ComponentType.MOUSE_FOLLOW;
  }
}
