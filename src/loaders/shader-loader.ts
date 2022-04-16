import { FileLoader } from 'three';
import { loadShaders } from '../shaders/index';

const loader = new FileLoader();

const loadAllShaders = () => loadShaders(loader);

export { loadAllShaders };
