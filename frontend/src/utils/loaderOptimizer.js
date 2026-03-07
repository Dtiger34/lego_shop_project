import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * Create a GLTFLoader pre-configured with DRACOLoader.
 * Draco decoder WASM files must exist at /draco/ in the public folder.
 */
export function createOptimizedLoader() {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  dracoLoader.preload();

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  return loader;
}

/**
 * Load a .glb model with DRACOLoader and a configurable timeout.
 * @param {string} url - Path to the .glb file.
 * @param {number} timeout - Milliseconds before aborting (default 45000).
 * @returns {Promise<import("three/examples/jsm/loaders/GLTFLoader").GLTF>}
 */
export function loadGLTFModel(url, timeout = 45000) {
  return new Promise((resolve, reject) => {
    const loader = createOptimizedLoader();

    const timer = setTimeout(() => {
      reject(new Error(`Timeout loading model: ${url}`));
    }, timeout);

    loader.load(
      url,
      (gltf) => {
        clearTimeout(timer);
        resolve(gltf);
      },
      undefined,
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

/**
 * Disable shadows on all meshes in a model to improve render performance.
 * @param {import("three").Object3D} model
 */
export function optimizeScene(model) {
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = false;
      child.receiveShadow = false;
      if (child.material) {
        child.material.needsUpdate = false;
      }
    }
  });
}
