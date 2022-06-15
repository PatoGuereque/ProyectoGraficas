import GameWindow from "../../scene/window";
import { GameObject } from "../object/gameobject";
import { ComponentType } from "./types";

/**
 * Game Component
 * A component labels an entity as possessing a particular aspect,
 * and holds the data needed to model that aspect.
 */
export abstract class Component {
  /**
   * Initializes the current game object
   *
   * @param {GameWindow} window the game window
   * @param {GameObject} gameObject the game object this
   *         component belongs to
   */
  public abstract init(window: GameWindow, gameObject: GameObject): void;

  /**
   * Updates the current component
   * Called every render
   *
   * @param {number} delta the time since last render
   * @param {GameWindow} gameWindow the game window
   * @param {GameObject} gameObject the game object to update
   */
  public abstract update(
    delta: number,
    gameWindow: GameWindow,
    gameObject: GameObject
  ): void;

  /**
   * Destroys the current component
   *
   * @param {GameWindo} window the game window
   * @param {GameObject} gameObject the game object this
   *         component is being disaccociated from
   */
  public abstract destroy(window: GameWindow, gameObject: GameObject): void;

  /**
   * Returns the type of this component, used as a key in
   * the game object's component map
   *
   * @returns {ComponentType} the type of component
   */
  public abstract getComponentType(): ComponentType;
}
