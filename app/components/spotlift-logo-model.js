// Spotlift logo — 3D model builder (three.js). Units: metres, y-up.
export function buildSpotliftLogo(THREE, opts = {}) {
  const M = {
    steel: new THREE.MeshStandardMaterial({ name: 'acier_brosse', color: 0xb9bec6, roughness: 0.42, metalness: 0.35 }),
    steelDark: new THREE.MeshStandardMaterial({ name: 'acier_sombre', color: 0x7d838c, roughness: 0.55, metalness: 0.3 }),
    face: new THREE.MeshStandardMaterial({ name: 'laque_noire', color: 0x111014, roughness: 0.3, metalness: 0.15 }),
    glyph: new THREE.MeshStandardMaterial({ name: 'email_blanc', color: 0xf4f5f7, roughness: 0.28, metalness: 0.12 }),
    ring: new THREE.MeshStandardMaterial({ name: 'anneau_degrade', color: 0x5f9aa0, roughness: 0.35, metalness: 0.35, vertexColors: true })
  };
  
  const logo = new THREE.Group();
  logo.name = 'spotlift_logo';
  
  // --- medallion body -------------------------------------------------
  const R_OUT = 0.147, D = 0.030;
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.137, 0.137, D, 128), M.steel);
  plate.name = 'plaque_corps';
  plate.rotation.x = Math.PI / 2;
  logo.add(plate);
  
  const bevel = new THREE.Mesh(new THREE.TorusGeometry(0.1335, 0.007, 20, 128), M.steelDark);
  bevel.name = 'chanfrein_arriere';
  bevel.position.z = -D / 2 + 0.002;
  logo.add(bevel);
  
  // gradient ring (violet -> vert), vertex-coloured
  const ringGeo = new THREE.TorusGeometry(0.1355, 0.0125, 28, 192);
  const cA = new THREE.Color(0x9b59b6), cB = new THREE.Color(0x1db954);
  const pos = ringGeo.attributes.position, cols = [];
  for (let i = 0; i < pos.count; i++) {
    const t = (pos.getY(i) / 0.148 + 1) / 2;  // bas -> haut
    const c = cB.clone().lerp(cA, Math.min(1, Math.max(0, t)));
    cols.push(c.r, c.g, c.b);
  }
  ringGeo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  const ring = new THREE.Mesh(ringGeo, M.ring);
  ring.name = 'anneau_degrade';
  logo.add(ring);
  
  const faceDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.119, 0.119, D + 0.004, 128), M.face);
  faceDisc.name = 'disque_noir';
  faceDisc.rotation.x = Math.PI / 2;
  logo.add(faceDisc);
  
  // --- stroke helpers (rounded-cap tubes, like the logo's lettering) ---
  const FZ = D / 2 + 0.002; // front surface of the black disc
  
  function stroke(g, a, b, r, mat, name) {
    const A = new THREE.Vector3(a[0], a[1], FZ + r);
    const B = new THREE.Vector3(b[0], b[1], FZ + r);
    const len = A.distanceTo(B);
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 20), mat);
    cyl.name = name;
    cyl.position.copy(A).add(B).multiplyScalar(0.5);
    cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
    g.add(cyl);
    for (const [i, P] of [A, B].entries()) {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12), mat);
      cap.name = name + '_cap' + i;
      cap.position.copy(P);
      g.add(cap);
    }
  }
  
  function arcStroke(g, cx, cy, R, r, span, rot, mat, name) {
    const m = new THREE.Mesh(new THREE.TorusGeometry(R, r, 16, 64, span), mat);
    m.name = name;
    m.position.set(cx, cy, FZ + r);
    m.rotation.z = rot;
    g.add(m);
  }
  
  // --- "A" mark --------------------------------------------------------
  const mark = new THREE.Group();
  mark.name = 'lettre_A';
  const ax = -0.018, ay = 0.028, sr = 0.0105;
  stroke(mark, [ax - 0.040, ay - 0.072], [ax, ay + 0.070], sr, M.glyph, 'A_jambe_gauche');
  stroke(mark, [ax + 0.040, ay - 0.072], [ax, ay + 0.070], sr, M.glyph, 'A_jambe_droite');
  stroke(mark, [ax - 0.021, ay - 0.014], [ax + 0.021, ay - 0.014], sr * 0.85, M.glyph, 'A_barre');
  logo.add(mark);
  
  // --- signal arcs -----------------------------------------------------
  const waves = new THREE.Group();
  waves.name = 'ondes';
  const wx = 0.036, wy = ay + 0.012;
  [[0.026, 0.0050, 1.05], [0.042, 0.0055, 1.00], [0.058, 0.0058, 0.95]].forEach(([R, r, span], i) => {
    arcStroke(waves, wx, wy, R, r, span, -span / 2, M.glyph, 'onde_' + (i + 1));
  });
  logo.add(waves);
  
  // --- "SPOTLIFT" wordmark --------------------------------------------
  const word = new THREE.Group();
  word.name = 'texte_spotlift';
  const h = 0.0120, tr = 0.0024, adv = 0.0188, baseY = -0.078;
  
  function letter(ch, x) {
    const g = new THREE.Group();
    g.name = 'lettre_' + ch;
    const w = 0.0072, y0 = baseY - h, y1 = baseY + h;
    const S = (a, b, n) => stroke(g, a, b, tr, M.glyph, ch + '_' + n);
    if (ch === 'S') {    const sR = h * 0.5;
      arcStroke(g, x, baseY + sR, sR, tr, 4.71, -0.35, M.glyph, 'S_haut');
      arcStroke(g, x, baseY - sR, sR, tr, 4.71, 2.79, M.glyph, 'S_bas');
      S([x - sR * 0.34, baseY + sR * 0.06], [x + sR * 0.34, baseY - sR * 0.06], 'spine');
    } else if (ch === 'P' || ch === 'F') {
      const mx = x - w * 0.65;
      S([mx, y0], [mx, y1], 'mont');
      if (ch === 'F') { S([mx, y1], [x + w * 0.7, y1], 'haut'); S([mx, baseY + tr], [x + w * 0.4, baseY + tr], 'milieu'); }
      else { arcStroke(g, mx, baseY + h * 0.5, h * 0.5, tr, Math.PI, -Math.PI / 2, M.glyph, 'P_boucle'); }
    } else if (ch === 'O') {
      const o = new THREE.Mesh(new THREE.TorusGeometry(w * 1.05, tr, 16, 48), M.glyph);
      o.name = 'O_anneau'; o.position.set(x, baseY, FZ + tr); o.scale.set(0.78, h / (w * 1.05), 1); g.add(o);
    } else if (ch === 'T') {
      S([x - w * 0.85, y1], [x + w * 0.85, y1], 'haut'); S([x, y1], [x, y0], 'mont');
    } else if (ch === 'L') {
      S([x - w * 0.6, y1], [x - w * 0.6, y0], 'mont'); S([x - w * 0.6, y0], [x + w * 0.7, y0], 'bas');
    } else if (ch === 'I') {
      S([x, y1], [x, y0], 'mont');
    }
    if (ch === 'P' || ch === 'F') g.position.x = 0.0018;
    return g;
  }
  
  const chars = 'SPOTLIFT'.split('');
  chars.forEach((ch, i) => word.add(letter(ch, (i - (chars.length - 1) / 2) * adv)));
  logo.add(word);
  

  const medallion = [plate, bevel, ring, faceDisc, mark, waves, word];
  if (opts.stand !== false) {
    const stand = new THREE.Group();
    stand.name = 'socle';
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.082, 0.016, 64), M.steelDark);
    disc.name = 'socle_base';
    disc.position.y = 0.008;
    stand.add(disc);
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.030, 0.028), M.steel);
    neck.name = 'socle_col';
    neck.position.y = 0.029;
    stand.add(neck);
    logo.add(stand);
    medallion.forEach(o => { o.position.y = (o.position.y || 0) + 0.040 + R_OUT; });
  }
  return logo;
}
