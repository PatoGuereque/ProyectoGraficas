import { GameObject } from '../gameobject';
import { Group } from 'three';
import GameWindow from '../../../scene/window';
import { models, ModelType } from '../../../models/index';
import { AnimatedComponent } from '../../component/components/animated';

export class Player extends GameObject {
  private model: Group;

  constructor() {
    super();
  }

  public init(window: GameWindow): void {
    const gltf = models.get(ModelType.Plane);

    this.model = gltf.scene;
    this.model.scale.set(0.4, 0.4, 0.4);
    this.model.rotation.y = Math.PI / 2;

    this.model.rotation.z = 0.4;
    window.scene.add(this.model);

    const animatedComponent = new AnimatedComponent(
      this.model,
      gltf.animations
    );
    const mesh = gltf.scene.children[ 0 ];
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    animatedComponent.setAnimation(0);
    this.addComponent(animatedComponent);

    super.init(window);
  }
}
