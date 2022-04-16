import { HemisphereLight } from 'three';
import GameWindow from '../../../scene/window';
import { GameObject } from '../gameobject';

export class HemiLight extends GameObject {
  private light: HemisphereLight;
  private x: number;
  private y: number;
  private z: number;

  constructor(x: number, y: number, z: number) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public init(window: GameWindow): void {
    this.light = new HemisphereLight(0xffffff, 0x444444, 1);
    this.light.position.set(this.x, this.y, this.z);
    window.scene.add(this.light);
  }

  public destroy(window: GameWindow): void {
    window.scene.remove(this.light);
  }
}
