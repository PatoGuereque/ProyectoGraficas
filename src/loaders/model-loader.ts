import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { loadModels } from '../models/index';

const loader = new GLTFLoader();

/**
 * Wrapper to load all models
 * 
 * @returns {Promise<void[]>} the promises of the models
 */
const loadAllModels = (): Promise<void[]> => loadModels(loader);

export { loadAllModels };
