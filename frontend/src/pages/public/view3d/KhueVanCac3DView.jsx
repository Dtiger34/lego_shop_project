import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./view3d.css";

const KhueVanCac3DView = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000,
      );
      camera.position.set(0, 0, 1.4);
      cameraRef.current = camera;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);

      // Load 3D model
      const loader = new GLTFLoader();
      loader.load(
        "/khue_van_cac.glb",
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

          // Enable shadows on model
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
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
          setError("Không thể tải mô hình 3D. Vui lòng thử lại.");
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
          <h2 className="section-title">
            Khuê Văn Các - Cổng Vinh Quang Của Văn Miếu
          </h2>
        </div>

        <div className="view3d-content">
          <div className="view3d-text">
            <div className="intro-block">
              <h3 className="intro-title">Về Khuê Văn Các</h3>
              <p className="intro-paragraph">
                Khuê Văn Các là cổng vinh quang của Văn Miếu Quốc Tử Giám, một
                trong những công trình kiến trúc cổ nhất và có giá trị nhất của
                Việt Nam. Được xây dựng từ thế kỷ XV, cổng này là biểu tượng của
                học vấn, tri thức và nền giáo dục truyền thống Việt Nam qua
                nhiều thế kỷ.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Kiến Trúc Độc Đáo</h3>
              <p className="intro-paragraph">
                Khuê Văn Các có kiến trúc trang nhã với chi tiết tinh xảo được
                tạo khắc trên gỗ và đá. Tên gọi "Khuê Văn" mang ý nghĩa "áng mây
                sắc" - biểu trưng cho cái đẹp và thanh cao của học vấn. Cổng này
                được coi là kiệt tác của kiến trúc cổ đại Việt Nam, ghi dấu ấn
                của nhiều thế hệ thợ xây dựng tài ba.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Ý Nghĩa Văn Hóa</h3>
              <p className="intro-paragraph">
                Khuê Văn Các không chỉ là cơ sở vật chất mà còn là biểu tượng
                tinh thần của nền giáo dục Việt Nam. Nơi đây ghi dấu tên của
                hàng vạn nhân tài đã đi qua Văn Miếu Quốc Tử Giám. Hiện nay,
                Khuê Văn Các là di sản thế giới được UNESCO công nhận, thu hút
                du khách từ khắp nơi trên thế giới.
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

export default KhueVanCac3DView;
