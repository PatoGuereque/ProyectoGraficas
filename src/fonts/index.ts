import { FontLoader, Font } from '../imports';

let pressStartFont: Font;

const loadFonts = (loader: FontLoader) => {
  return Promise.all([
    loader.loadAsync('static/fonts/prstart.json').then((font) => {
      pressStartFont = font;
    }),
  ]);
};

export { pressStartFont, loadFonts };
