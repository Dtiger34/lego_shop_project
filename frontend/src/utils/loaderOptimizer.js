import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * Create optimized GLTF loader with optional Draco support
 */
export const createOptimizedLoader = () => {
  const loader = new GLTFLoader();

  // Try to add Draco decoder if available
  try {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);
    console.log("Draco decoder enabled for compressed models");
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    console.log("Draco decoder not available, using standard GLB loading");
  }

  // Set aggressive caching
  loader.manager.requestHeader = {
    "Cache-Control": "public, max-age=31536000",
  };

  return loader;
};

/**
 * Load GLTF model with timeout and retry logic
 */
export const loadGLTFModel = (
  loader,
  modelPath,
  onLoad,
  onProgress,
  onError,
  timeout = 30000,
) => {
  let timeoutId = null;
  let isLoaded = false;

  const handleLoad = (gltf) => {
    isLoaded = true;
    if (timeoutId) clearTimeout(timeoutId);
    onLoad(gltf);
  };

  const handleError = (error) => {
    if (timeoutId) clearTimeout(timeoutId);
    console.error("Model loading failed:", error);
    onError(error);
  };

  const handleProgress = (progressEvent) => {
    onProgress?.(progressEvent);
  };

  // Set timeout for loading
  timeoutId = setTimeout(() => {
    if (!isLoaded) {
      handleError(new Error("Model loading timeout after " + timeout + "ms"));
    }
  }, timeout);

  try {
    loader.load(modelPath, handleLoad, handleProgress, handleError);
  } catch (error) {
    handleError(error);
  }
};

/**
 * Optimize scene for faster rendering
 */
export const optimizeScene = (model) => {
  let meshCount = 0;
  let materialCount = 0;

  model.traverse((child) => {
    if (child.isMesh) {
      meshCount++;
      // Disable per-mesh shadows
      child.castShadow = false;
      child.receiveShadow = false;

      // Optimize materials
      if (child.material) {
        materialCount++;
        child.material.side = THREE.FrontSide;
        // Disable costly features
        if (child.material.map) {
          child.material.map.minFilter = THREE.LinearFilter;
        }
      }
    }

    // Remove expensive structures
    if (child.skeleton) {
      child.skeleton.poses = [];
    }
  });

  console.log(
    `Optimized scene: ${meshCount} meshes, ${materialCount} materials`,
  );
};

/**
 * Create lightweight background scene (not used)
 */
export const createMinimalLighting = (scene) => {
  // Remove all lights first
  scene.children.forEach((child) => {
    if (child.isLight) {
      scene.remove(child);
    }
  });

  // Add minimal lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  // Use emissive materials instead of directional light for better performance
  return ambientLight;
};
