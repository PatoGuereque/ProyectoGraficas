import { Clock, Color, Fog, PCFSoftShadowMap, Scene, sRGBEncoding, WebGLRenderer } from "three";
import { Phase } from "../game/phases/phase";
import { MainMenuPhase } from "../game/phases/start-phase";
import HudCamera from "./hud-camera";
import MainCamera from "./main-camera";

class GameWindow {
  private renderer: WebGLRenderer;
  private mainCamera: MainCamera;
  private hudCamera: HudCamera;
  private clock: Clock;
  public scene: Scene;
  public hud: Scene;
  public phase: Phase;

  constructor() {
    this.mainCamera = new MainCamera();
    this.hudCamera = new HudCamera();
    this.scene = new Scene();
    this.hud = new Scene();
    this.renderer = new WebGLRenderer({ antialias: true });
    this.phase = new MainMenuPhase();
    this.clock = new Clock();

    this.renderer.autoClear = false;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene.background = new Color().setHSL(0.6, 0, 1);
    this.scene.fog = new Fog(this.scene.background, 1, 5000);

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.shadowMap.enabled = true;

    window.addEventListener("resize", () => {
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
    this.phase.init(this);

    const animation = () => {
      const delta = this.clock.getDelta();
      this.phase.tick(delta, this);
      this.render();
    };

    this.renderer.setAnimationLoop(animation);
  }

  public getRenderer(): WebGLRenderer {
    return this.renderer;
  }

  public getMainCamera(): MainCamera {
    return this.mainCamera;
  }
}

export default GameWindow;
