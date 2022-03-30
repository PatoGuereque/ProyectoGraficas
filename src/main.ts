import * as THREE from 'three';
import { fontLoader } from './loaders/index';
import { TextGeometry } from './imports';
import GameWindow from './scene/window';

const gameWindow: GameWindow = new GameWindow();

fontLoader.loadAllFonts().then(() => {
  gameWindow.init();
});

export default gameWindow;
