import { Group } from "three";
import GameWindow from "../../../scene/window";
import { GameObject } from "../../object/gameobject";
import { Component } from "../component";
import { ComponentType } from "../types";

let mousePos = { x: 0, y: 0 };

// now handle the mousemove event
const handleMouseMove = (event: MouseEvent) => {
  // here we are converting the mouse position value received
  // to a normalized value varying between -1 and 1;
  // this is the formula for the horizontal axis:
  const tx = -1 + (event.clientX / window.innerWidth) * 2;

  // for the vertical axis, we need to inverse the formula
  // because the 2D y-axis goes the opposite direction of the 3D y-axis

  const ty = 1 - (event.clientY / window.innerHeight) * 2;
  mousePos = { x: tx, y: ty };
};

const normalize = (
  v: number,
  vmin: number,
  vmax: number,
  tmin: number,
  tmax: number
) => {
  var nv = Math.max(Math.min(v, vmax), vmin);
  var dv = vmax - vmin;
  var pc = (nv - vmin) / dv;
  var dt = tmax - tmin;
  var tv = tmin + pc * dt;
  return tv;
};

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
    delta: number,
    gameWindow: GameWindow,
    gameObject: GameObject
  ): void {
    const targetX = normalize(mousePos.x, -1, 1, -1, 1);
    const targetY = normalize(mousePos.y, 0, 1, -0.5, 0.5) - 0.1;

    this.model.position.x = targetX;
    this.model.position.y += targetY - this.model.position.y;
  }

  public destroy(window: GameWindow, gameObject: GameObject): void {
    document.removeEventListener("mousemove", handleMouseMove);
  }

  public getComponentType(): ComponentType {
    return ComponentType.MOUSE_FOLLOW;
  }
}
