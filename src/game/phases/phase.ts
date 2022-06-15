import GameWindow from "../../scene/window";

/**
 * Defines a phase from our game.
 * Each phase follows the following cycle
 *
 * init
 *  |
 *  \/
 * tick  <- -
 *  |       |   repeats while in
 *  - - - - -   current phase
 *  |
 *  \/
 * destroy
 *
 */
export abstract class Phase {
  /**
   * Initializes the current phase
   * Can be used to initialize scene game objects
   *
   * @param {GameWindow} window the game window
   */
  public abstract init(window: GameWindow): void;

  /**
   * Ticks the current phase
   * Called every render
   *
   * @param {number} delta the time since last render
   * @param {GameWindow} gameWindow the game window
   */
  public abstract tick(delta: number, gameWindow: GameWindow): void;

  /**
   * Destroys the current phase
   *
   * @param {GameWindo} window the game window
   */
  public abstract destroy(window: GameWindow): void;
}
