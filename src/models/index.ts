import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Every model from this enum gets dynamically loaded in
 */
export enum ModelType {
  Plane = "plane/scene.gltf",
  Bird = "bird/scene.gltf",
}

/**
 * Stores our loaded models. These models are meant to be
 * unmodifiable
 */
const models: Map<ModelType, GLTF> = new Map();

const loadModels = (loader: GLTFLoader) => {
  return Promise.all(
    Object.values(ModelType).map(async (url) => {
      document.getElementById("loader").innerText = `Loading ${url}...`;
      const model = await loader.loadAsync(`static/models/${url}`);
      models.set(url, model);
    })
  );
};

export { loadModels, models };
