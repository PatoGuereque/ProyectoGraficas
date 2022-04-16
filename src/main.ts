import * as THREE from 'three';
import { fontLoader, modelLoader, shaderLoader } from './loaders/index';
import { TextGeometry } from './imports';
import GameWindow from './scene/window';

const gameWindow: GameWindow = new GameWindow();

fontLoader
  .loadAllFonts()
  .then(modelLoader.loadAllModels)
  .then(shaderLoader.loadAllShaders)
  .then(() => {
    gameWindow.init();
  });

export default gameWindow;
