import {
  BoxGeometry,
  Mesh,
  MeshNormalMaterial,
  Scene,
  WebGLRenderer,
} from 'three';
import { pressStartFont } from '../fonts/index';
import { TextGeometry } from '../imports';
import HudCamera from './hud-camera';
import MainCamera from './main-camera';

class GameWindow {
  private renderer: WebGLRenderer;
  private mainCamera: MainCamera;
  private hudCamera: HudCamera;
  private scene: Scene;
  private hud: Scene;

  constructor() {
    this.mainCamera = new MainCamera();
    this.hudCamera = new HudCamera();
    this.scene = new Scene();
    this.hud = new Scene();
    this.renderer = new WebGLRenderer({ antialias: true });

    this.renderer.autoClear = false;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => {
      this.onWindowResize();
    });
  }

  render() {
    this.renderer.clear();
    this.renderer.render(this.scene, this.mainCamera);
    this.renderer.render(this.hud, this.hudCamera);
  }

  onWindowResize() {
    this.mainCamera.aspect = window.innerWidth / window.innerHeight;
    this.mainCamera.updateProjectionMatrix();

    this.hudCamera.updateWindowSize();
    this.hudCamera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  init() {
    const cubegeometry = new BoxGeometry(0.2, 0.2, 0.2);

    const textGeometry = new TextGeometry('Hello world!', {
      font: pressStartFont,
      size: 12,
    });

    const material = new MeshNormalMaterial();

    const cubeMesh = new Mesh(cubegeometry, material);
    const textMesh = new Mesh(textGeometry, material);
    this.scene.add(cubeMesh);
    this.hud.add(textMesh);

    const animation = (time: number) => {
      cubeMesh.rotation.x = time / 2000;
      cubeMesh.rotation.y = time / 1000;

      textMesh.position.y = - (window.innerHeight / 4);
      textMesh.position.x = -95;
      this.render();
    };

    this.renderer.setAnimationLoop(animation);
  }

  public getRenderer(): WebGLRenderer {
    return this.renderer;
  }
}

export default GameWindow;
