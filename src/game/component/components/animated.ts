import { AnimationClip, AnimationMixer, Group } from 'three';
import GameWindow from '../../../scene/window';
import { GameObject } from '../../object/gameobject';
import { Component } from '../component';
import { ComponentType } from '../types';

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
    gameWindow: GameWindow,
    gameObject: GameObject
  ): void {
    this.mixer.update(time);
  }

  public destroy(window: GameWindow, gameObject: GameObject): void {}

  public getComponentType(): ComponentType {
    return ComponentType.ANIMATED;
  }

  public setAnimation(index: number) {
    this.mixer.clipAction(this.animations[index]).play();
  }
}
