import { fontLoader, modelLoader, shaderLoader } from './loaders/index';
import GameWindow from './scene/window';

const gameWindow: GameWindow = new GameWindow();

fontLoader
  .loadAllFonts()
  .then(modelLoader.loadAllModels)
  .then(shaderLoader.loadAllShaders)
  .then(() => {
    document.getElementById("loader").remove();
    gameWindow.init();
  });

export default gameWindow;
