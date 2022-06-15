import { GameObject } from "../gameobject";
import { Group } from "three";
import GameWindow from "../../../scene/window";
import { models, ModelType } from "../../../models/index";
import { AnimatedComponent } from "../../component/components/animated";
import { MovingComponent } from "../../component/components/moving";

/**
 * Our bird that randomly flies on the screen,
 * has a random y position on every pass
 */
export class Bird extends GameObject {
  private model: Group;

  constructor() {
    super();
  }

  public init(window: GameWindow): void {
    const gltf = models.get(ModelType.Bird);

    this.model = gltf.scene;
    const scale = 0.2;
    this.model.scale.set(scale, scale, scale);
    this.model.rotation.y = -Math.PI / 2;
    this.model.position.y = 2 + Math.random()*3;
    this.model.position.x = 10;

    this.model.rotation.z = 0.4;
    window.scene.add(this.model);

    const animatedComponent = new AnimatedComponent(
      this.model,
      gltf.animations
    );
    const mesh = gltf.scene.children[0];
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.model.traverse((object: any) => {
      if (object.isMesh) object.castShadow = true;
    });

    animatedComponent.setAnimation(0);
    this.addComponent(animatedComponent);
    this.addComponent(new MovingComponent(this.model, 4.5));
    super.init(window);
  }
}
