import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createOptimizedLoader } from "../../../utils/loaderOptimizer.js";
import "./view3d.css";

const CauTheHuc3DView = () => {
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
      const loader = createOptimizedLoader();
      loader.load(
        "/cau_the_huc.glb",
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
          <h2 className="section-title">Cầu Thê Húc - Cầu Cổ Giữa Hồ Gươm</h2>
        </div>

        <div className="view3d-content">
          <div className="view3d-text">
            <div className="intro-block">
              <h3 className="intro-title">Về Cầu Thê Húc</h3>
              <p className="intro-paragraph">
                Cầu Thê Húc là chiếc cầu gỗ cổ nằm giữa Hồ Gươm, nối liền Đền
                Ngọc Sơn với đất liền. Được xây dựng từ thế kỷ XVIII, cầu này có
                kiến trúc độc đáo với tên gọi mang ý nghĩa "cầu sào dạng cung" -
                biểu trưng cho sự thanh thoát và tinh tế của kiến trúc Việt Nam
                xưa.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Kiến Trúc Độc Đáo</h3>
              <p className="intro-paragraph">
                Cầu Thê Húc được đặc trưng bởi hình dáng cung cầu thanh nhã, làm
                bằng gỗ với chi tiết trang trí tinh xảo. Cầu này không chỉ là
                công trình kiến trúc mà còn là biểu tượng của sự kết nối giữa
                con người với thiên nhiên. Kiến trúc cong của cầu tạo nên vẻ đẹp
                hài hòa, phản ánh triết lý thiết kế truyền thống của người Việt.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Ý Nghĩa Văn Hóa</h3>
              <p className="intro-paragraph">
                Cầu Thê Húc là một phần không thể tách rời của cảnh quan Hà Nội,
                nơi gắn liền với những kỷ niệm, câu chuyện yêu thương và những
                bước đi lâu dài của người dân thủ đô. Hiện nay, cầu vẫn được giữ
                gìn và sửa chữa để bảo tồn di sản này, tạo nên một đốm sáng văn
                hóa giữa lòng thành phố hiện đại.
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

export default CauTheHuc3DView;
