import { GameObject } from "../gameobject";
import { Group } from "three";
import GameWindow from "../../../scene/window";
import { models, ModelType } from "../../../models/index";
import { AnimatedComponent } from "../../component/components/animated";
import { MouseFollowComponent } from "../../component/components/mouse-follow";

export class Player extends GameObject {
  private model: Group;

  constructor() {
    super();
  }

  public init(window: GameWindow): void {
    const gltf = models.get(ModelType.Plane);

    this.model = gltf.scene;
    const scale = 1;
    this.model.scale.set(scale, scale, scale);
    this.model.rotation.y = Math.PI / 2;
    this.model.position.y = -30;

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
    this.addComponent(new MouseFollowComponent(this.model));
    super.init(window);
  }
}
