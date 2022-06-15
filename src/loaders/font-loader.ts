import { loadFonts } from '../fonts/index';
import { FontLoader } from '../imports';

const fontLoader = new FontLoader();

/**
 * Wrapper to load all fonts
 * 
 * @returns {Promise<void[]>} the promises of the models
 */
const loadAllFonts = (): Promise<void[]> => loadFonts(fontLoader);

export { loadAllFonts };
