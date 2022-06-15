import { AnimationClip, AnimationMixer, Group } from "three";
import GameWindow from "../../../scene/window";
import { GameObject } from "../../object/gameobject";
import { Component } from "../component";
import { ComponentType } from "../types";

/**
 * Animates the model this component belongs to
 */
export class AnimatedComponent extends Component {
  private mixer: AnimationMixer;
  private animations: AnimationClip[];

  constructor(model: Group, animations: AnimationClip[]) {
    super();
    this.mixer = new AnimationMixer(model);
    this.animations = animations;
  }

  public init(): void {}

  public update(
    time: number,
    _gameWindow: GameWindow,
    _gameObject: GameObject
  ): void {
    this.mixer.update(time);
  }

  public destroy(_window: GameWindow, _gameObject: GameObject): void {}

  public getComponentType(): ComponentType {
    return ComponentType.ANIMATED;
  }

  /**
   * Sets the current animation to another animation that
   * is stored in the model. (E.g Run can be 0, walk can
   * be 1)
   *
   * @param {number} index the animation index
   */
  public setAnimation(index: number) {
    this.mixer.clipAction(this.animations[index]).play();
  }
}
