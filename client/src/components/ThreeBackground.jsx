import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeBackground.css';

let circlePointTexture;

function getCirclePointTexture() {
  if (!circlePointTexture) {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.65, 'rgba(255,255,255,0.9)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    circlePointTexture = new THREE.CanvasTexture(canvas);
    circlePointTexture.needsUpdate = true;
  }
  return circlePointTexture;
}

function createPointCloud(count, spread, color, size, opacity) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const radius = spread * (0.4 + Math.random() * 0.6);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity,
    sizeAttenuation: true,
    map: getCirclePointTexture(),
    alphaTest: 0.1,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

function createGlowSprite(color, size, opacity) {
  const material = new THREE.SpriteMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(size, size, 1);
  return sprite;
}

function ThreeBackground({ variant = 'home' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020214, 0.0022);
    scene.background = new THREE.Color(0x03070f);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 36);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.28);
    const keyLight = new THREE.DirectionalLight(0x8bd1ff, 0.8);
    keyLight.position.set(3, 4, 5);
    scene.add(ambientLight, keyLight);

    const updateFns = [];
    // subtle mouse-based parallax
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((e.clientY - rect.top) / rect.height) * -2 + 1;
    };
    container.addEventListener('mousemove', onMove);

    const addHomeScene = () => {
      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(6, 2),
        new THREE.MeshPhysicalMaterial({
          color: 0x7ea7ff,
          roughness: 0.16,
          metalness: 0.25,
          clearcoat: 0.88,
          clearcoatRoughness: 0.08,
          emissive: 0x3e78ff,
          emissiveIntensity: 0.5,
          transmission: 0.55,
          transparent: true,
          opacity: 0.92,
        })
      );
      scene.add(core);

      const homeGlow = createGlowSprite(0x89c5ff, 3.2, 0.18);
      homeGlow.position.set(0, 0, 4);
      scene.add(homeGlow);

      const ringGroup = new THREE.Group();
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x89b9ff,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
      });
      for (let i = 0; i < 3; i += 1) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(9 + i * 1.8, 0.12, 18, 140),
          ringMaterial
        );
        ring.rotation.x = Math.PI / 2;
        ring.rotation.y = i * 0.18;
        ringGroup.add(ring);
      }
      scene.add(ringGroup);

      const particles = createPointCloud(220, 28, 0xe3f0ff, 0.55, 0.4);
      scene.add(particles);

      updateFns.push((t) => {
        core.rotation.x = t * 0.35;
        core.rotation.y = t * 0.28;
        homeGlow.material.opacity = 0.14 + Math.sin(t * 0.9) * 0.02;
        ringGroup.rotation.y = t * -0.12;
        ringGroup.rotation.x = Math.sin(t * 0.1) * 0.08;
        particles.rotation.y = t * 0.04;
      });
    };

    const addAboutScene = () => {
      const crystal = new THREE.Mesh(
        new THREE.OctahedronGeometry(6.8, 1),
        new THREE.MeshPhysicalMaterial({
          color: 0xb3c2ff,
          roughness: 0.12,
          metalness: 0.18,
          clearcoat: 0.92,
          clearcoatRoughness: 0.08,
          emissive: 0x7f8dff,
          emissiveIntensity: 0.55,
          transmission: 0.52,
          transparent: true,
          opacity: 0.88,
        })
      );
      crystal.rotation.set(0.3, 0.7, 0);
      scene.add(crystal);

      const aboutGlow = createGlowSprite(0xb9c4ff, 4.2, 0.16);
      aboutGlow.position.set(0, 0, 4.5);
      scene.add(aboutGlow);

      const ringGroup = new THREE.Group();
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xccd8ff,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
      });
      for (let i = 0; i < 4; i += 1) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(8.8 + i * 1.5, 0.1, 18, 128),
          ringMaterial
        );
        ring.rotation.x = Math.PI / 2;
        ring.rotation.z = i * 0.34;
        ringGroup.add(ring);
      }
      scene.add(ringGroup);

      const shards = new THREE.Group();
      const shardMaterial = new THREE.MeshStandardMaterial({
        color: 0xe0e8ff,
        emissive: 0x809cff,
        emissiveIntensity: 0.38,
        roughness: 0.12,
        metalness: 0.18,
        transparent: true,
        opacity: 0.7,
      });
      for (let i = 0; i < 20; i += 1) {
        const shard = new THREE.Mesh(
          new THREE.ConeGeometry(0.28, 1.6, 6),
          shardMaterial
        );
        const radius = 15 + Math.random() * 3;
        const angle = (i / 20) * Math.PI * 2;
        shard.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 5.5, Math.sin(angle) * radius);
        shard.lookAt(0, 0, 0);
        shards.add(shard);
      }
      scene.add(shards);

      const particles = createPointCloud(180, 32, 0xdfe7ff, 0.48, 0.45);
      scene.add(particles);

      updateFns.push((t) => {
        crystal.rotation.x = t * 0.32;
        crystal.rotation.y = t * 0.22;
        aboutGlow.material.opacity = 0.12 + Math.sin(t * 0.8) * 0.03;
        ringGroup.rotation.y = t * -0.18;
        shards.rotation.y = t * 0.04;
        particles.rotation.y = t * -0.03;
      });
    };

    const addServicesScene = () => {
      const nodeOrb = new THREE.Mesh(
        new THREE.IcosahedronGeometry(5.8, 2),
        new THREE.MeshPhysicalMaterial({
          color: 0x67f0ff,
          roughness: 0.18,
          metalness: 0.24,
          clearcoat: 0.82,
          clearcoatRoughness: 0.1,
          emissive: 0x39d5ff,
          emissiveIntensity: 0.44,
          transmission: 0.52,
          transparent: true,
          opacity: 0.92,
        })
      );
      scene.add(nodeOrb);

      const servicesGlow = createGlowSprite(0xa9f4ff, 3.6, 0.16);
      servicesGlow.position.set(0, 0, 4);
      scene.add(servicesGlow);

      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(10, 0.34, 140, 20),
        new THREE.MeshBasicMaterial({
          color: 0x96e7ff,
          transparent: true,
          opacity: 0.24,
          wireframe: true,
        })
      );
      scene.add(knot);

      const nodes = createPointCloud(140, 26, 0xe8ffff, 0.48, 0.58);
      scene.add(nodes);

      updateFns.push((t) => {
        nodeOrb.rotation.x = t * 0.22;
        nodeOrb.rotation.y = t * 0.18;
        servicesGlow.material.opacity = 0.12 + Math.sin(t * 0.7) * 0.03;
        knot.rotation.x = t * 0.14;
        knot.rotation.z = t * 0.1;
        nodes.rotation.y = t * -0.06;
      });
    };

    const addContactScene = () => {
      const globe = new THREE.Mesh(
        new THREE.SphereGeometry(6.1, 64, 64),
        new THREE.MeshPhysicalMaterial({
          color: 0x063f8d,
          roughness: 0.18,
          metalness: 0.28,
          clearcoat: 0.96,
          clearcoatRoughness: 0.02,
          emissive: 0x0f6fc9,
          emissiveIntensity: 0.14,
          transmission: 0.35,
          transparent: true,
          opacity: 0.82,
        })
      );
      scene.add(globe);

      const globeWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.SphereGeometry(6.15, 48, 48)),
        new THREE.LineBasicMaterial({ color: 0x6eb6ff, transparent: true, opacity: 0.18 })
      );
      scene.add(globeWire);

      const mapPoints = 260;
      const mapPositions = new Float32Array(mapPoints * 3);
      for (let i = 0; i < mapPoints; i += 1) {
        const lat = (Math.random() * 140 - 70) * (Math.PI / 180);
        const lon = (Math.random() * 360 - 180) * (Math.PI / 180);
        const radius = 6.15 + Math.random() * 0.14;
        const x = radius * Math.cos(lat) * Math.cos(lon);
        const y = radius * Math.sin(lat);
        const z = radius * Math.cos(lat) * Math.sin(lon);
        mapPositions[i * 3] = x;
        mapPositions[i * 3 + 1] = y;
        mapPositions[i * 3 + 2] = z;
      }
      const mapGeo = new THREE.BufferGeometry();
      mapGeo.setAttribute('position', new THREE.BufferAttribute(mapPositions, 3));
      const mapPointCloud = new THREE.Points(
        mapGeo,
        new THREE.PointsMaterial({ color: 0x8cc9ff, size: 0.14, transparent: true, opacity: 0.9, sizeAttenuation: true })
      );
      scene.add(mapPointCloud);

      const cityGroup = new THREE.Group();
      const cityMaterial = new THREE.MeshStandardMaterial({ color: 0xc8ecff, emissive: 0x7fd0ff, emissiveIntensity: 0.45, roughness: 0.16, metalness: 0.14 });
      for (let i = 0; i < 10; i += 1) {
        const lat = (Math.random() * 140 - 70) * (Math.PI / 180);
        const lon = (Math.random() * 360 - 180) * (Math.PI / 180);
        const radius = 6.4;
        const city = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), cityMaterial);
        city.position.set(
          radius * Math.cos(lat) * Math.cos(lon),
          radius * Math.sin(lat),
          radius * Math.cos(lat) * Math.sin(lon)
        );
        cityGroup.add(city);
      }
      scene.add(cityGroup);

      const orbitRing = new THREE.Mesh(
        new THREE.TorusGeometry(9.8, 0.06, 12, 160),
        new THREE.MeshBasicMaterial({ color: 0x7bb2ff, transparent: true, opacity: 0.12 })
      );
      orbitRing.rotation.x = Math.PI / 2;
      scene.add(orbitRing);

      const tiltRing = new THREE.Mesh(
        new THREE.TorusGeometry(10.8, 0.04, 10, 160),
        new THREE.MeshBasicMaterial({ color: 0xaadeff, transparent: true, opacity: 0.08, side: THREE.DoubleSide })
      );
      tiltRing.rotation.x = Math.PI / 2;
      tiltRing.rotation.z = 0.35;
      scene.add(tiltRing);

      const contactLight = new THREE.PointLight(0x7fd1ff, 1.15, 64, 2);
      contactLight.position.set(2.2, 1.6, 6.3);
      scene.add(contactLight);

      const contactGlow = createGlowSprite(0x52b5ff, 6.6, 0.18);
      contactGlow.position.set(0, 0, 4.6);
      scene.add(contactGlow);

      const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(6.5, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x62bfff, transparent: true, opacity: 0.06, side: THREE.BackSide })
      );
      scene.add(atmosphere);

      const ambientParticles = createPointCloud(140, 18, 0xb4dfff, 0.28, 0.42);
      ambientParticles.position.z = -3.5;
      scene.add(ambientParticles);

      updateFns.push((t, target) => {
        globe.rotation.y = t * 0.16;
        globe.rotation.x = Math.sin(t * 0.08) * 0.03;
        globeWire.rotation.y = t * 0.16;
        mapPointCloud.rotation.y = t * 0.16;
        cityGroup.rotation.y = t * 0.16;
        orbitRing.rotation.z = t * 0.08 + target.x * 0.05;
        tiltRing.rotation.z = -t * 0.06 + target.x * 0.04;
        atmosphere.rotation.y = t * -0.05;
        ambientParticles.rotation.y = t * -0.04 + target.x * -0.02;
        contactGlow.material.opacity = 0.14 + Math.sin(t * 0.88) * 0.04;
        contactLight.position.x = 2.2 + Math.sin(t * 0.74) * 0.16 + target.x * 1.6;
        contactLight.position.y = 1.6 + Math.cos(t * 0.54) * 0.12 + target.y * 1.4;
        cityGroup.children.forEach((city, index) => {
          city.scale.setScalar(1 + Math.sin(t * 1.2 + index) * 0.08);
        });
      });
    };

    const addApproachScene = () => {
      const core = new THREE.Mesh(
        new THREE.OctahedronGeometry(5.2, 1),
        new THREE.MeshPhysicalMaterial({
          color: 0xe8f4ff,
          roughness: 0.1,
          metalness: 0.16,
          clearcoat: 0.92,
          clearcoatRoughness: 0.05,
          emissive: 0x9bc7ff,
          emissiveIntensity: 0.45,
          transmission: 0.5,
          transparent: true,
          opacity: 0.9,
        })
      );
      scene.add(core);

      const halo = new THREE.Group();
      const ringColors = [0xa1d7ff, 0xd3ecff, 0xf4fbff];
      for (let i = 0; i < 3; i += 1) {
        const ring = new THREE.LineLoop(
          new THREE.TorusGeometry(7.8 + i * 1.8, 0.04, 12, 120),
          new THREE.LineBasicMaterial({ color: ringColors[i], opacity: 0.18 - i * 0.03, transparent: true })
        );
        ring.rotation.x = Math.PI / 2;
        ring.rotation.z = i * 0.24;
        halo.add(ring);
      }
      scene.add(halo);

      const approachLight = new THREE.PointLight(0xd2e5ff, 0.68, 62, 2);
      approachLight.position.set(-1.2, 1.1, 5);
      scene.add(approachLight);

      const approachGlow = createGlowSprite(0xd7f0ff, 4.4, 0.16);
      approachGlow.position.set(0, 1, 4);
      scene.add(approachGlow);

      const ribbonGroup = new THREE.Group();
      const ribbonMaterial = new THREE.MeshStandardMaterial({
        color: 0xcbeeff,
        emissive: 0xafd8ff,
        emissiveIntensity: 0.22,
        roughness: 0.16,
        metalness: 0.12,
        transparent: true,
        opacity: 0.78,
        side: THREE.DoubleSide,
      });
      for (let i = 0; i < 4; i += 1) {
        const ribbon = new THREE.Mesh(
          new THREE.BoxGeometry(12, 0.36, 0.45),
          ribbonMaterial
        );
        ribbon.position.set(0, (i - 1.5) * 1.6, 0);
        ribbon.rotation.z = i * 0.16;
        ribbonGroup.add(ribbon);
      }
      scene.add(ribbonGroup);

      const sparklePoints = createPointCloud(120, 18, 0xe4f4ff, 0.36, 0.62);
      sparklePoints.position.y = -0.8;
      scene.add(sparklePoints);

      const spotlight = createGlowSprite(0xd0ecff, 5.4, 0.09);
      spotlight.position.set(0.2, 1.2, 4.2);
      scene.add(spotlight);

      const accentPoints = createPointCloud(32, 10, 0xfff2ff, 0.8, 0.9);
      accentPoints.position.y = 0.4;
      scene.add(accentPoints);

      updateFns.push((t, target) => {
        core.rotation.y = t * -0.22 + target.x * 0.08;
        core.rotation.x = Math.sin(t * 0.18) * 0.06 + target.y * 0.05;
        halo.rotation.y = t * 0.1 + target.x * 0.04;
        ribbonGroup.rotation.z = Math.sin(t * 0.14) * 0.12 + target.x * 0.12;
        ribbonGroup.position.y = Math.sin(t * 0.23) * 0.22 + target.y * 1.6;
        approachLight.intensity = 0.48 + Math.sin(t * 0.8) * 0.14;
        approachLight.position.x = -1.2 + Math.sin(t * 0.7) * 0.24 + target.x * 1.8;
        approachLight.position.y = 1.1 + Math.cos(t * 0.6) * 0.15 + target.y * 1.2;
        approachGlow.material.opacity = 0.1 + Math.sin(t * 1.2) * 0.04;
        spotlight.material.opacity = 0.08 + Math.sin(t * 1.5) * 0.03;
        sparklePoints.rotation.y = t * -0.06 + target.x * -0.02;
        accentPoints.rotation.y = t * 0.12;
      });
    };

    switch (variant) {
      case 'about':
        addAboutScene();
        break;
      case 'services':
        addServicesScene();
        break;
      case 'contact':
        addContactScene();
        break;
      case 'approach':
        addApproachScene();
        break;
      default:
        addHomeScene();
    }

    let frame = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      frame += 0.01;
      // interpolate parallax target
      target.x += (mouse.x - target.x) * 0.06;
      target.y += (mouse.y - target.y) * 0.06;
      // apply gentle camera parallax
      camera.position.x = target.x * 3.2;
      camera.position.y = target.y * 2.4;
      camera.lookAt(0, 0, 0);
      updateFns.forEach((fn) => fn(frame, target));
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMove);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((material) => material.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return <div ref={containerRef} className="three-bg" />;
}

export default ThreeBackground;
