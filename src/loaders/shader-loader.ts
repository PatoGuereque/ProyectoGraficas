import { FileLoader } from 'three';
import { loadShaders } from '../shaders/index';

const loader = new FileLoader();

/**
 * Wrapper to load all shaders
 * 
 * @returns {Promise<void[]>} the promises of the shaders
 */
const loadAllShaders = (): Promise<void[]> => loadShaders(loader);

export { loadAllShaders };
