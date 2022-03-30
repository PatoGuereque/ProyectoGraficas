import { loadFonts } from '../fonts/index';
import { FontLoader } from '../imports';

const fontLoader = new FontLoader();

const loadAllFonts = () => loadFonts(fontLoader);

export { loadAllFonts };
