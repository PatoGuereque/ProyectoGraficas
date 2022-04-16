import { FileLoader } from 'three';

export enum ShaderType {
  Sky = 'sky/sky',
}

export interface Shader {
  frag: string;
  vert: string;
}

const shaders: Map<ShaderType, Shader> = new Map();

const loadShaders = (loader: FileLoader) => {
  return Promise.all(
    Object.values(ShaderType).map(async (url) => {
      const frag = await loader.loadAsync(`static/shaders/${url}.frag`);
      const vert = await loader.loadAsync(`static/shaders/${url}.vert`);
      shaders.set(url, {
        frag: frag as string,
        vert: vert as string,
      });
    })
  );
};

export { loadShaders, shaders };
