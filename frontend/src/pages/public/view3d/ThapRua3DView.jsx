import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./view3d.css";

const ThapRua3DView = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000,
      );
      camera.position.set(0, 0, 1.4);
      cameraRef.current = camera;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      scene.add(directionalLight);

      // Load 3D model
      const loader = new GLTFLoader();
      loader.load(
        "/thap_rua.glb",
        (gltf) => {
          const model = gltf.scene;

          // Center and scale the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          model.position.sub(center);
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 1.5 / maxDim;
          model.scale.multiplyScalar(scale);

          // Optimize model rendering
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = false;
              child.receiveShadow = false;
            }
          });

          scene.add(model);
          setIsLoading(false);

          // Enable auto-rotation
          let autoRotate = true;
          const autoRotationSpeed = 0.01;

          // Mouse controls
          let isDragging = false;
          let previousMousePosition = { x: 0, y: 0 };

          renderer.domElement.addEventListener("mousedown", (e) => {
            isDragging = true;
            autoRotate = false;
            previousMousePosition = { x: e.clientX, y: e.clientY };
          });

          renderer.domElement.addEventListener("mousemove", (e) => {
            if (isDragging) {
              const deltaX = e.clientX - previousMousePosition.x;
              const deltaY = e.clientY - previousMousePosition.y;

              model.rotation.y += deltaX * 0.01;
              model.rotation.x += deltaY * 0.01;

              previousMousePosition = { x: e.clientX, y: e.clientY };
            }
          });

          renderer.domElement.addEventListener("mouseup", () => {
            isDragging = false;
            autoRotate = true;
          });

          renderer.domElement.addEventListener("mouseleave", () => {
            isDragging = false;
            autoRotate = true;
          });

          // Wheel zoom
          renderer.domElement.addEventListener("wheel", (e) => {
            e.preventDefault();
            const zoomSpeed = 0.1;
            if (e.deltaY > 0) {
              camera.position.z += zoomSpeed;
            } else {
              camera.position.z -= zoomSpeed;
              camera.position.z = Math.max(0.5, camera.position.z);
            }
          });

          // Animation loop
          const animate = () => {
            requestAnimationFrame(animate);

            if (autoRotate && model) {
              model.rotation.y += autoRotationSpeed;
            }

            renderer.render(scene, camera);
          };

          animate();
        },
        (progress) => {
          // Loading progress
          console.log(
            `Loading... ${((progress.loaded / progress.total) * 100).toFixed(2)}%`,
          );
        },
        (err) => {
          console.error("Error loading model:", err);
          setIsLoading(false);
        },
      );

      // Handle window resize
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
        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.error("Error setting up 3D viewer:", err);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="view3d-section">
      <div className="view3d-container">
        <div className="view3d-header">
          <span className="section-badge">khám phá 3d</span>
          <h2 className="section-title">Tháp Rùa - Biểu Tượng Của Tuổi Thọ</h2>
        </div>

        <div className="view3d-content">
          <div className="view3d-text">
            <div className="intro-block">
              <h3 className="intro-title">Về Tháp Rùa</h3>
              <p className="intro-paragraph">
                Tháp Rùa là một tháp cổ nằm giữa Hồ Gươm, xây dựng từ thế kỷ XIX
                với mục đích tôn vinh con rùa thần - biểu tượng của sự khôn
                ngoan, tuổi thọ và may mắn trong văn hóa Việt Nam. Tháp này mang
                theo những câu chuyện thần kỳ và là nơi mệnh danh là di sản văn
                hóa vô cùng ý nghĩa.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Kiến Trúc Độc Đáo</h3>
              <p className="intro-paragraph">
                Tháp Rùa được xây dựng với kiến trúc độc đáo, tạo hình dáng
                giống như một chiếc tháp hẹp để dễ dàng bước qua Hồ. Công trình
                được xây dựng bằng gạch và vữa truyền thống, với chi tiết trang
                trí tinh xảo. Thân tháp có chi tiết hình rùa, biểu trưng cho ý
                nghĩa sâu xa của nó trong văn hóa dân gian.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Ý Nghĩa Văn Hóa</h3>
              <p className="intro-paragraph">
                Tháp Rùa không chỉ là một công trình kiến trúc mà còn là một
                biểu tượng linh thiêng của tín ngưỡng dân gian Việt Nam. Người
                dân tin rằng con rùa là biểu tượng của may mắn, sức khỏe và sự
                sống lâu dài. Hiện nay, tháp vẫn được giữ gìn kỹ lưỡng, là một
                phần không thể tách rời của cảnh quan Hồ Gươm và lịch sử Hà Nội.
              </p>
            </div>
          </div>

          <div className="view3d-viewer">
            <div className="viewer-frame">
              <div className="viewer-label">Xem mô hình 3D</div>
              <div className="view3d-main">
                {isLoading && (
                  <div className="view3d-loading">
                    <div className="spinner"></div>
                    <p>Đang tải mô hình 3D...</p>
                  </div>
                )}

                {error && (
                  <div className="view3d-error">
                    <p>{error}</p>
                  </div>
                )}

                <div
                  ref={containerRef}
                  className="view3d-canvas"
                  style={{ width: "100%", height: "100%" }}
                ></div>
              </div>
              <div className="viewer-footer">
                Kéo chuột để xoay | Cuộn để zoom
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThapRua3DView;
