import { Group } from "three";
import GameWindow from "../../../scene/window";
import { GameObject } from "../../object/gameobject";
import { Component } from "../component";
import { ComponentType } from "../types";

/**
 * Defines a constant movement on the x-axis
 * Also randomizes y-position
 * TODO: This should be split into two different components
 */
export class MovingComponent extends Component {
  private model: Group;
  private speed: number;

  constructor(model: Group, speed: number) {
    super();
    this.model = model;
    this.speed = speed;
  }

  public init(): void {}

  public update(
    time: number,
    gameWindow: GameWindow,
    gameObject: GameObject
  ): void {
    this.model.position.x -= this.speed * time;

    const minX =
      -(gameWindow.getMainCamera().visibleWidthAtZDepth(0) / 2) +
      gameWindow.getMainCamera().position.x -
      5;
    if (minX > this.model.position.x) {
      this.model.position.x =
        gameWindow.getMainCamera().visibleWidthAtZDepth(0) / 2 +
        gameWindow.getMainCamera().position.x;
      this.model.position.y = 2 + Math.random() * 3;
    }
  }

  public destroy(window: GameWindow, gameObject: GameObject): void {}

  public getComponentType(): ComponentType {
    return ComponentType.MOVING;
  }
}
