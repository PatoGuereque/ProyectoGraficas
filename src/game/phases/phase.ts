import GameWindow from '../../scene/window';

export abstract class Phase {
  public abstract init(window: GameWindow): void;
  public abstract tick(delta: number, gameWindow: GameWindow): void;
  public abstract destroy(window: GameWindow): void;
}
