import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export enum ModelType {
  Plane = "plane/scene.gltf",
  Bird = "bird/scene.gltf",
}

const models: Map<ModelType, GLTF> = new Map();

const loadModels = (loader: GLTFLoader) => {
  return Promise.all(
    Object.values(ModelType).map(async (url) => {
      const model = await loader.loadAsync(`static/models/${url}`);
      models.set(url, model);
    })
  );
};

export { loadModels, models };
