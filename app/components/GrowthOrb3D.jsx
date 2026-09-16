'use client';
// Spotlift — Growth Orb 3D : visualisation vivante du Growth Score.
// Même approche technique que SpotliftLogo3D.jsx (Three.js direct, pas de
// dépendance nouvelle — `three` est déjà installé dans le projet).
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { buildGrowthOrb } from './growth-orb-model';

export default function GrowthOrb3D({
  score = 62,        // 0-100
  size = 220,         // px (carré)
  spin = 0.18,        // vitesse de rotation d'ensemble (rad/s)
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

    const { group, particles } = buildGrowthOrb(THREE, score);
    scene.add(group);

    scene.add(new THREE.HemisphereLight(0xc9cfe0, 0x1a1024, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(0.6, 0.9, 1.4);
    scene.add(key);

    const resize = () => {
      const w = el.clientWidth || size;
      const h = el.clientHeight || size;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const r = 0.24;
      camera.position.set(0, 0.03, r / Math.tan((camera.fov * Math.PI) / 360));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    renderer.render(scene, camera);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    renderer.setAnimationLoop(() => {
      const t = reduce ? 1.2 : (performance.now() - start) / 1000;
      group.rotation.y = t * spin;
      group.rotation.x = 0.32 + Math.sin(t * 0.3) * 0.03;

      particles.children.forEach((p) => {
        const { radius, angle, tilt, speed } = p.userData;
        const a = angle + t * speed;
        p.position.set(Math.cos(a) * radius, Math.sin(tilt) * radius * 0.4, Math.sin(a) * radius);
      });

      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      ro.disconnect();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, spin, size]);

  return (
    <div
      ref={host}
      className={className}
      style={{ width: size, height: size, ...style }}
      aria-label={`Growth Score : ${score} sur 100`}
      role="img"
    />
  );
}