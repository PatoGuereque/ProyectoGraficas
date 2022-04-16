import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { loadModels } from '../models/index';

const loader = new GLTFLoader();

const loadAllModels = () => loadModels(loader);

export { loadAllModels };
