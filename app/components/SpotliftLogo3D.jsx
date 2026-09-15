'use client';
// Spotlift — logo 3D. Requiert `npm i three`.
// Le modèle lui-même vit dans ./spotlift-logo-model.js (même dossier).
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { buildSpotliftLogo } from './spotlift-logo-model';

export default function SpotliftLogo3D({
  size = 180,          // px (carré)
  spin = 0.35,         // vitesse de rotation (rad/s)
  tilt = 0.12,         // amplitude du balancement vertical
  fit = 1.06,          // marge autour du logo
  parallax = true,     // suit la souris
  className,
  style,
}) {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 50);

    const pivot = new THREE.Group();
    pivot.add(buildSpotliftLogo(THREE, { stand: false }));
    scene.add(pivot);

    scene.add(new THREE.HemisphereLight(0xc9cfe0, 0x1a1024, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(0.6, 0.9, 1.4);
    scene.add(key);
    const rimA = new THREE.DirectionalLight(0x9b59b6, 1.6);   // violet Spotlift
    rimA.position.set(-1.2, 0.8, 0.3);
    scene.add(rimA);
    const rimB = new THREE.DirectionalLight(0x1db954, 1.2);   // vert Spotify
    rimB.position.set(1.0, -0.9, 0.2);
    scene.add(rimB);

    const resize = () => {
      const w = el.clientWidth || size;
      const h = el.clientHeight || size;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const r = (0.152 * fit) / Math.min(1, camera.aspect);
      camera.position.set(0, 0, r / Math.tan((camera.fov * Math.PI) / 360));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    renderer.render(scene, camera);

    let mx = 0, my = 0;
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (parallax) window.addEventListener('pointermove', onMove);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    renderer.setAnimationLoop(() => {
      const t = reduce ? 1.2 : (performance.now() - start) / 1000;
      pivot.rotation.y = t * spin + mx * 0.35;
      pivot.rotation.x = Math.sin(t * spin * 0.7) * tilt - my * 0.18;
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      if (parallax) window.removeEventListener('pointermove', onMove);
      ro.disconnect();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [spin, tilt, fit, parallax, size]);

  return (
    <div
      ref={host}
      className={className}
      style={{ width: size, height: size, ...style }}
      aria-label="Logo Spotlift"
      role="img"
    />
  );
}
