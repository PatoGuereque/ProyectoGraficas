import { Group } from "three";
import GameWindow from "../../../scene/window";
import { GameObject } from "../../object/gameobject";
import { Component } from "../component";
import { ComponentType } from "../types";

export class HoverComponent extends Component {
  private offset: number;
  private time: number;
  private posZ: number;
  private model: Group;

  constructor(model: Group, offset: number) {
    super();
    this.offset = offset;
    this.time = 0;
    this.posZ = model.position.y;
    this.model = model;
  }

  public init(): void {}

  public update(
    delta: number,
    gameWindow: GameWindow,
    gameObject: GameObject
  ): void {
    this.time += delta;
    //this.model.position.y = this.posZ + Math.cos(this.time) * this.offset;
  }

  public destroy(window: GameWindow, gameObject: GameObject): void {}

  public getComponentType(): ComponentType {
    return ComponentType.HOVER;
  }
}
