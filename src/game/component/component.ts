import GameWindow from '../../scene/window';
import { GameObject } from '../object/gameobject';
import { ComponentType } from './types';

export abstract class Component {
  public abstract init(window: GameWindow, gameObject: GameObject): void;

  public abstract update(
    time: number,
    gameWindow: GameWindow,
    gameObject: GameObject
  ): void;

  public abstract destroy(window: GameWindow, gameObject: GameObject): void;

  public abstract getComponentType(): ComponentType;
}
