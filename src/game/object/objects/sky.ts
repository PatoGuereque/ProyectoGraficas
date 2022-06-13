import {
  BackSide,
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  HemisphereLightHelper,
  Mesh,
  MeshLambertMaterial,
  PlaneGeometry,
  ShaderMaterial,
  SphereGeometry,
} from 'three';
import GameWindow from '../../../scene/window';
import { shaders, ShaderType } from '../../../shaders/index';
import { GameObject } from '../gameobject';

export class SkyBox extends GameObject {
  public init(gameWindow: GameWindow): void {
    const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 1, 0);
    hemiLight.scale.set(0.01, 0.01, 0.01)
    gameWindow.scene.add(hemiLight);

    //const hemiLightHelper = new HemisphereLightHelper( hemiLight, 10 );
    //gameWindow.scene.add( hemiLightHelper );

    const dirLight = new DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(0.5);
    gameWindow.scene.add(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;

    const d = 40;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;

    //const dirLightHelper = new DirectionalLightHelper( dirLight, 10 );
    //gameWindow.scene.add( dirLightHelper );

    // GROUND

    const groundGeo = new PlaneGeometry(10000, 10000);
    const groundMat = new MeshLambertMaterial({ color: 0xffffff });
    groundMat.color.setHSL(0.25, 0.91, 0.78);

    const ground = new Mesh(groundGeo, groundMat);
    ground.position.y = -33;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    gameWindow.scene.add(ground);

    // SKYDOME

    const shader = shaders.get(ShaderType.Sky);
    const uniforms = {
      topColor: { value: new Color(0x0077ff) },
      bottomColor: { value: new Color(0xffffff) },
      offset: { value: 33 },
      exponent: { value: 0.6 },
    };
    uniforms['topColor'].value.copy(hemiLight.color);

    gameWindow.scene.fog.color.copy(uniforms['bottomColor'].value);

    const skyGeo = new SphereGeometry(4000, 32, 15);
    const skyMat = new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shader.vert,
      fragmentShader: shader.frag,
      side: BackSide,
    });

    const sky = new Mesh(skyGeo, skyMat);
    gameWindow.scene.add(sky);
  }
}
