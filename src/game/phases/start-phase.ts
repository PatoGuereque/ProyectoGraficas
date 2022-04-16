import { Material, Mesh, MeshNormalMaterial } from 'three';
import { pressStartFont } from '../../fonts/index';
import { TextGeometry } from '../../imports';
import GameWindow from '../../scene/window';
import { HemiLight } from '../object/objects/hemilight';
import { Player } from '../object/objects/player';
import { SkyBox } from '../object/objects/sky';
import { Phase } from './phase';

export class MainMenuPhase extends Phase {
  private player: Player;
  private textGeometry: TextGeometry;

  private material: Material;
  private textMesh: Mesh;

  public init(window: GameWindow): void {
    this.textGeometry = new TextGeometry('Hello world!', {
      font: pressStartFont,
      size: 12,
    });

    this.material = new MeshNormalMaterial();

    this.textMesh = new Mesh(this.textGeometry, this.material);
    window.hud.add(this.textMesh);

    this.player = new Player();
    this.player.init(window);

    const sky = new SkyBox();
    sky.init(window);
  }

  public tick(delta: number, gameWindow: GameWindow): void {
    this.textMesh.position.y = -window.innerHeight / 2 + 15;
    this.textMesh.position.x = -window.innerWidth / 2 + 15;
    this.player.update(delta, gameWindow);
  }

  public destroy(window: GameWindow) {
    window.hud.remove(this.textMesh);
  }
}
