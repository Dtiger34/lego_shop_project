import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./ThreeDViewer.css";

export default function ThreeDViewer() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const groupRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, down: false });
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8f4f8);
    sceneRef.current = scene;

    // Camera setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 2.5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create group for the pagoda
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const colors = {
      stone: 0x8b7355,
      roof: 0xd4604a,
      wood: 0xa0826d,
      gold: 0xffd700,
      shadow: 0x333333,
    };

    // Base/Foundation
    const baseGeom = new THREE.CylinderGeometry(0.8, 0.9, 0.15, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: colors.stone });
    const base = new THREE.Mesh(baseGeom, baseMat);
    base.position.y = -0.5;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    // Main pillar/Column
    const pillarGeom = new THREE.CylinderGeometry(0.15, 0.18, 1.2, 16);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: colors.stone,
      roughness: 0.7,
    });
    const pillar = new THREE.Mesh(pillarGeom, pillarMat);
    pillar.position.y = 0.1;
    pillar.castShadow = true;
    pillar.receiveShadow = true;
    group.add(pillar);

    // Capital (top of column)
    const capitalGeom = new THREE.CylinderGeometry(0.22, 0.18, 0.1, 16);
    const capital = new THREE.Mesh(capitalGeom, pillarMat);
    capital.position.y = 0.65;
    capital.castShadow = true;
    group.add(capital);

    // Roof - first tier
    const roof1Geom = new THREE.ConeGeometry(0.5, 0.3, 16);
    const roofMat = new THREE.MeshStandardMaterial({
      color: colors.roof,
      roughness: 0.6,
    });
    const roof1 = new THREE.Mesh(roof1Geom, roofMat);
    roof1.position.y = 0.85;
    roof1.castShadow = true;
    roof1.receiveShadow = true;
    group.add(roof1);

    // Roof - second tier (smaller)
    const roof2Geom = new THREE.ConeGeometry(0.35, 0.2, 16);
    const roof2 = new THREE.Mesh(roof2Geom, roofMat);
    roof2.position.y = 1.15;
    roof2.castShadow = true;
    group.add(roof2);

    // Spire/Top
    const spireGeom = new THREE.ConeGeometry(0.1, 0.4, 8);
    const spireMat = new THREE.MeshStandardMaterial({
      color: colors.gold,
      metalness: 0.8,
    });
    const spire = new THREE.Mesh(spireGeom, spireMat);
    spire.position.y = 1.45;
    spire.castShadow = true;
    group.add(spire);

    // Altar room (cube below roof)
    const altarGeom = new THREE.BoxGeometry(0.3, 0.4, 0.3);
    const altarMat = new THREE.MeshStandardMaterial({ color: colors.wood });
    const altar = new THREE.Mesh(altarGeom, altarMat);
    altar.position.y = 0.7;
    altar.castShadow = true;
    group.add(altar);

    // Door
    const doorGeom = new THREE.BoxGeometry(0.08, 0.2, 0.02);
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const door = new THREE.Mesh(doorGeom, doorMat);
    door.position.set(0.12, 0.6, 0.16);
    door.castShadow = true;
    group.add(door);

    // Decorative rings on pillar
    for (let i = 0; i < 5; i++) {
      const ringGeom = new THREE.TorusGeometry(0.16, 0.01, 8, 16);
      const ringMat = new THREE.MeshStandardMaterial({ color: colors.gold });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.y = -0.2 + i * 0.3;
      ring.rotation.x = Math.PI / 2;
      ring.castShadow = true;
      group.add(ring);
    }

    // Mouse events
    const onMouseDown = (e) => {
      mouseRef.current.down = true;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!mouseRef.current.down) return;

      const deltaX = (e.clientX - mouseRef.current.x) * 0.01;
      const deltaY = (e.clientY - mouseRef.current.y) * 0.01;

      rotationRef.current.y += deltaX;
      rotationRef.current.x += deltaY;

      // Clamp vertical rotation
      rotationRef.current.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, rotationRef.current.x),
      );

      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onMouseUp = () => {
      mouseRef.current.down = false;
    };

    // Zoom with mouse wheel
    const onMouseWheel = (e) => {
      e.preventDefault();
      const zoomSpeed = 0.2;
      const direction = e.deltaY > 0 ? 1 : -1;
      camera.position.z += direction * zoomSpeed;
      camera.position.z = Math.max(1, Math.min(5, camera.position.z));
    };

    // Touch events for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      mouseRef.current.down = true;
    };

    const onTouchMove = (e) => {
      if (!mouseRef.current.down) return;
      const touch = e.touches[0];
      const deltaX = (touch.clientX - touchStartX) * 0.01;
      const deltaY = (touch.clientY - touchStartY) * 0.01;

      rotationRef.current.y += deltaX;
      rotationRef.current.x += deltaY;

      rotationRef.current.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, rotationRef.current.x),
      );

      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    const onTouchEnd = () => {
      mouseRef.current.down = false;
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("wheel", onMouseWheel, {
      passive: false,
    });
    renderer.domElement.addEventListener("touchstart", onTouchStart);
    renderer.domElement.addEventListener("touchmove", onTouchMove);
    renderer.domElement.addEventListener("touchend", onTouchEnd);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (groupRef.current) {
        groupRef.current.rotation.y = rotationRef.current.y;
        groupRef.current.rotation.x = rotationRef.current.x;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("mouseup", onMouseUp);
      renderer.domElement.removeEventListener("wheel", onMouseWheel);
      renderer.domElement.removeEventListener("touchstart", onTouchStart);
      renderer.domElement.removeEventListener("touchmove", onTouchMove);
      renderer.domElement.removeEventListener("touchend", onTouchEnd);
      if (
        containerRef.current &&
        renderer.domElement.parentNode === containerRef.current
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="viewer-page">
      <div className="viewer-header">
        <h1>Chùa Một Cột - Mô Hình 3D</h1>
        <p>Kéo chuột để xoay, scroll để zoom</p>
      </div>
      <div className="viewer-container" ref={containerRef}></div>
      <div className="viewer-info">
        <h3>Hướng dùng:</h3>
        <ul>
          <li>🖱️ Kéo chuột: Xoay xung quanh mô hình 360 độ</li>
          <li>🔍 Scroll: Zoom gần/xa để xem chi tiết</li>
          <li>📱 Touch: Kéo ngón tay để xoay trên di động</li>
        </ul>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          Chùa Một Cột là biểu tượng kiến trúc đặc biệt của Việt Nam, được xây
          dựng từ thế kỷ XI.
        </p>
      </div>
    </div>
  );
}
