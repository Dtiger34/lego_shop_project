import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createOptimizedLoader } from "../utils/loaderOptimizer.js";

const use3DViewer = (glbPath, { highQuality = false } = {}) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);

      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000,
      );
      camera.position.set(0, 0, 1.4);

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: highQuality,
        alpha: true,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(
        highQuality
          ? window.devicePixelRatio
          : Math.min(window.devicePixelRatio, 1.5),
      );
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = highQuality ? 2048 : 1024;
      directionalLight.shadow.mapSize.height = highQuality ? 2048 : 1024;
      scene.add(directionalLight);

      // Load model
      const loader = createOptimizedLoader();
      loader.load(
        glbPath,
        (gltf) => {
          const model = gltf.scene;

          // Center and scale
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          model.position.sub(center);
          const maxDim = Math.max(size.x, size.y, size.z);
          model.scale.multiplyScalar(1.5 / maxDim);
          // Face model toward camera (front = +X → rotate to +Z)
          model.rotation.y = -Math.PI / 2;

          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = highQuality;
              child.receiveShadow = highQuality;
            }
          });

          scene.add(model);
          setIsLoading(false);

          // Mouse drag
          let isDragging = false;
          let previousMousePosition = { x: 0, y: 0 };

          renderer.domElement.addEventListener("mousedown", (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
          });

          renderer.domElement.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;
            model.rotation.y += deltaX * 0.01;
            model.rotation.x += deltaY * 0.01;
            previousMousePosition = { x: e.clientX, y: e.clientY };
          });

          renderer.domElement.addEventListener("mouseup", () => {
            isDragging = false;
          });

          renderer.domElement.addEventListener("mouseleave", () => {
            isDragging = false;
          });

          // Wheel zoom
          renderer.domElement.addEventListener("wheel", (e) => {
            e.preventDefault();
            const zoomSpeed = 0.1;
            if (e.deltaY > 0) {
              camera.position.z += zoomSpeed;
            } else {
              camera.position.z = Math.max(0.5, camera.position.z - zoomSpeed);
            }
          });

          // Animation loop
          const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
          };
          animate();
        },
        undefined,
        (err) => {
          console.error("Error loading model:", err);
          setError("Không thể tải mô hình 3D.");
          setIsLoading(false);
        },
      );

      // Resize handler
      const handleResize = () => {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.error("Error setting up 3D viewer:", err);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, [glbPath]);

  return { containerRef, isLoading, error };
};

export default use3DViewer;
