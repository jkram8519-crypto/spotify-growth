// Spotlift — Growth Orb 3D model builder (three.js). Units: metres, y-up.
// Visualise un score de croissance (0-100) sous forme d'anneau-jauge lumineux
// avec un noyau central et des particules en orbite. Reprend le langage visuel
// du médaillon Spotlift (anneau dégradé violet -> vert) : un score bas reste
// majoritairement violet, un score élevé devient vert franc.
export function buildGrowthOrb(THREE, score = 62) {
  const s = Math.max(0, Math.min(100, score)) / 100;
  const cViolet = new THREE.Color(0x9b59b6);
  const cGreen = new THREE.Color(0x1db954);
  const cScore = cViolet.clone().lerp(cGreen, s);

  const group = new THREE.Group();
  group.name = 'growth_orb';

  // --- piste de fond (jauge complète, discrète) ---------------------------
  const track = new THREE.Mesh(
    new THREE.TorusGeometry(0.155, 0.006, 24, 128),
    new THREE.MeshStandardMaterial({ color: 0x2d1040, roughness: 0.7, metalness: 0.1 }),
  );
  track.name = 'piste';
  group.add(track);

  // --- arc de score (dégradé violet -> vert selon la progression réelle) --
  const arcAngle = Math.max(0.001, s * Math.PI * 2 - 0.06); // petite coupure visuelle
  const arcGeo = new THREE.TorusGeometry(0.155, 0.011, 24, 160, arcAngle);
  const pos = arcGeo.attributes.position;
  const cols = [];
  for (let i = 0; i < pos.count; i++) {
    const angle = Math.atan2(pos.getY(i), pos.getX(i));
    // TorusGeometry(arc) parcourt l'angle local de 0 à arcAngle : cette valeur
    // représente déjà directement la progression sur le cercle complet (0-1).
    const t = Math.max(0, Math.min(1, angle / (Math.PI * 2)));
    const c = cViolet.clone().lerp(cGreen, t);
    cols.push(c.r, c.g, c.b);
  }
  arcGeo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  const arc = new THREE.Mesh(
    arcGeo,
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.3, metalness: 0.4, emissive: cScore, emissiveIntensity: 0.35 }),
  );
  arc.name = 'arc_score';
  arc.rotation.z = -Math.PI / 2; // départ en haut, sens horaire
  group.add(arc);

  // --- noyau central (glow) -------------------------------------------------
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.040, 2),
    new THREE.MeshStandardMaterial({
      color: cScore,
      emissive: cScore,
      emissiveIntensity: 0.9,
      roughness: 0.25,
      metalness: 0.2,
    }),
  );
  core.name = 'noyau';
  group.add(core);

  const coreWire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.062, 1),
    new THREE.MeshBasicMaterial({ color: cScore, wireframe: true, transparent: true, opacity: 0.35 }),
  );
  coreWire.name = 'noyau_wireframe';
  group.add(coreWire);

  // --- particules en orbite (nombre proportionnel au score) ---------------
  const particles = new THREE.Group();
  particles.name = 'particules';
  const count = 4 + Math.round(s * 10); // 4 à 14 particules
  for (let i = 0; i < count; i++) {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.006 + Math.random() * 0.004, 12, 12),
      new THREE.MeshStandardMaterial({
        color: cViolet.clone().lerp(cGreen, Math.random()),
        emissive: cScore,
        emissiveIntensity: 0.6,
      }),
    );
    const radius = 0.11 + Math.random() * 0.09;
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
    const tilt = (Math.random() - 0.5) * 0.6;
    p.position.set(Math.cos(angle) * radius, Math.sin(tilt) * radius * 0.4, Math.sin(angle) * radius);
    p.userData = { radius, angle, tilt, speed: 0.3 + Math.random() * 0.5 };
    particles.add(p);
  }
  group.add(particles);

  return { group, core, coreWire, particles, score: s, color: cScore };
}