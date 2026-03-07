import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./view3d.css";

const ChuaMotCot3DView = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

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
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      containerRef.current.appendChild(renderer.domElement);
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
        "/chua_mot_cot_3d.glb",
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
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.error("Error setting up 3D viewer:", err);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("Có lỗi xảy ra khi khởi tạo 3D viewer.");
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="view3d-section">
      <div className="view3d-container">
        {/* Header */}
        <div className="view3d-header">
          <span className="section-badge">khám phá 3d</span>
          <h2 className="section-title">Chùa Một Cột - Kiệt Tác Kiến Trúc</h2>
        </div>

        {/* Content */}
        <div className="view3d-content">
          {/* Left Side - Introduction */}
          <div className="view3d-text">
            <div className="intro-block">
              <h3 className="intro-title">Về Chùa Một Cột</h3>
              <p className="intro-paragraph">
                Chùa Một Cột là một ngôi chùa nổi tiếng tại Hà Nội, một trong
                những biểu tượng văn hóa tôn giáo lâu đời nhất của Việt Nam.
                Được xây dựng vào thế kỷ XI dưới thời vua Lý Thánh Tông, chùa
                mang kiến trúc độc đáo với một cột đỡ ở giữa mặt nước.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Kiến Trúc Độc Đáo</h3>
              <p className="intro-paragraph">
                Điểm đặc biệt nhất của chùa là cấu trúc kiến trúc: toàn bộ chùa
                được xây dựng trên một cột đá đơn lẻ mọc từ dưới mặt nước, tượng
                trưng hình cây sen - biểu tượng của sự thanh khiết trong Phật
                giáo.
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-title">Giá Trị Lịch Sử</h3>
              <p className="intro-paragraph">
                Chùa Một Cột được công nhận là di tích lịch sử văn hóa quốc gia,
                là nơi lưu giữ những giá trị truyền thống tinh hoa của dân tộc
                Việt Nam. Nó không chỉ là nơi thờ phụng tôn giáo mà còn là một
                tác phẩm nghệ thuật kiến trúc vô cùng quý báu.
              </p>
            </div>
          </div>

          {/* Right Side - 3D Viewer */}
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

export default ChuaMotCot3DView;
