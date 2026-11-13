/**
 * „7 + 3“ – ein Rohbau wächst beim Scrollen aus der Baugrube bis ins
 * siebte Obergeschoss, danach legt der Besucher die Leistungsgrenze fest
 * (Rohbau / mit Gebäudehülle / schlüsselfertig).
 *
 * Das Modell ist schematisch und kommt aus dem Code, nicht aus einer
 * CAD-Datei: Geschosshöhe und Koten sind zeichnerisch angenommen. Es soll
 * den Ablauf zeigen, kein Bauwerk abbilden.
 *
 * Geladen wird dieses Modul erst, wenn der Abschnitt in die Naehe des
 * Sichtfensters kommt – three.js ist zu schwer fuer den ersten Seitenaufruf.
 */
import * as THREE from 'three';

/* ── Masse in Metern ──────────────────────────────────────────────── */
const GH = 3.1; // Geschosshoehe
const DECKE = 0.3; // Deckenstaerke
const BREITE = 22;
const TIEFE = 16;
const EBENEN = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7];
const DACH = 8;
const GRUBE_X = 34;
const GRUBE_Z = 28;
const FALLHOEHE = 26; // aus dieser Hoehe schwebt eine Decke ein

/** Anteil der Scrollstrecke, in dem das Gebaeude waechst. Danach die Stufen. */
const WACHSEN_BIS = 0.66;

const FARBE = {
  grund: 0x1a1616,
  gelaende: 0x393230,
  beton: 0xb9b2ac,
  deckePlatte: 0xc9c3bd,
  wu: 0x8d8984, // wasserundurchlaessige Untergeschosse, etwas dunkler
  kante: 0x0f0d0c,
  oxide: 0xa5092f,
  glas: 0x2b3238,
  licht: 0xffd9a8,
  fassade: 0x8a827c,
};

/* ── kleine Helfer ────────────────────────────────────────────────── */
const klemme = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const anteil = (von: number, bis: number, x: number) => klemme((x - von) / (bis - von));
/** weiches Ein- und Ausschwingen */
const glatt = (x: number) => x * x * (3 - 2 * x);
/** schnelles Abbremsen, wie ein Kranhaken, der aufsetzt */
const ausQuart = (x: number) => 1 - (1 - x) ** 4;
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export const koteText = (ebene: number) => {
  const wert = ebene * GH;
  if (Math.abs(wert) < 0.001) return '±0,00';
  const z = Math.abs(wert).toFixed(2).replace('.', ',');
  return `${wert > 0 ? '+' : '−'}${z}`;
};

export const ebenenName = (ebene: number, de: boolean) => {
  if (ebene === 0) return de ? 'EG' : 'Ground';
  if (ebene > 0) return de ? `${ebene}. OG` : `Level ${ebene}`;
  return de ? `${-ebene}. UG` : `Basement ${-ebene}`;
};

/* ── Bauteile ─────────────────────────────────────────────────────── */

function kantenZu(geo: THREE.BufferGeometry, deckkraft: number) {
  const linien = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 25),
    new THREE.LineBasicMaterial({ color: FARBE.kante, transparent: true, opacity: deckkraft })
  );
  return linien;
}

/**
 * Decke eines Geschosses mit umlaufender Stirn. Ohne diesen Rand wirken die
 * Geschosse wie lose Platten statt wie ein Bauwerk.
 */
function deckenGeometrie(ebene: number) {
  const unten = ebene * GH;
  const teile: THREE.BufferGeometry[] = [];

  const platte = new THREE.BoxGeometry(BREITE, DECKE, TIEFE);
  platte.translate(0, unten + DECKE / 2, 0);
  teile.push(platte);

  // Randbalken: aussen bündig, nach unten vorstehend. Die Oberkante sitzt
  // exakt an der Plattenunterkante – ragte sie in die Platte hinein, laegen
  // dort zwei Aussenflaechen in derselben Ebene und wuerden flimmern.
  const h = 0.55;
  const b = 0.45;
  const y = unten - h / 2;
  const raender: [number, number, number, number][] = [
    [BREITE, b, 0, TIEFE / 2 - b / 2],
    [BREITE, b, 0, -TIEFE / 2 + b / 2],
    [b, TIEFE - 2 * b, BREITE / 2 - b / 2, 0],
    [b, TIEFE - 2 * b, -BREITE / 2 + b / 2, 0],
  ];
  for (const [bx, bz, x, z] of raender) {
    const r = new THREE.BoxGeometry(bx, h, bz);
    r.translate(x, y, z);
    teile.push(r);
  }
  return zusammen(teile);
}

/** Stuetzen, Kern und – unter Gelaende – die umlaufende Wand. */
function tragwerkGeometrien(ebene: number) {
  const teile: THREE.BufferGeometry[] = [];
  const unten = ebene * GH + DECKE;
  const hoehe = GH - DECKE;

  if (ebene < 0) {
    // Untergeschoss: umlaufende Aussenwand in wasserundurchlaessiger Bauweise
    const d = 0.4;
    // Um dieses Mass hinter der Deckenkante: so trifft die Wandaussenseite
    // nie auf die Ebene des Randbalkens darueber. Deckungsgleiche Flaechen
    // aus zwei Koerpern streiten sonst um dieselbe Tiefe und flackern.
    const rueck = 0.07;
    const aussenX = BREITE / 2 - rueck;
    const aussenZ = TIEFE / 2 - rueck;
    const seiten: [number, number, number, number][] = [
      [aussenX * 2, d, 0, aussenZ - d / 2],
      [aussenX * 2, d, 0, -aussenZ + d / 2],
      [d, aussenZ * 2 - 2 * d, aussenX - d / 2, 0],
      [d, aussenZ * 2 - 2 * d, -aussenX + d / 2, 0],
    ];
    for (const [bx, bz, x, z] of seiten) {
      const w = new THREE.BoxGeometry(bx, hoehe, bz);
      w.translate(x, unten + hoehe / 2, z);
      teile.push(w);
    }
  } else {
    // Obergeschoss: Stuetzenraster
    const sx = 0.5;
    const spalten = [-8.5, -4.25, 4.25, 8.5];
    const reihen = [-5.5, 0, 5.5];
    for (const x of spalten) {
      for (const z of reihen) {
        const s = new THREE.BoxGeometry(sx, hoehe, sx);
        s.translate(x, unten + hoehe / 2, z);
        teile.push(s);
      }
    }
  }

  // Treppenhaus- und Aufzugskern, durchgehend ueber alle Ebenen
  const kernB = 5.4;
  const kernT = 4.6;
  const wand = 0.32;
  const kernSeiten: [number, number, number, number][] = [
    [kernB, wand, 0, kernT / 2 - wand / 2],
    [kernB, wand, 0, -kernT / 2 + wand / 2],
    [wand, kernT - 2 * wand, kernB / 2 - wand / 2, 0],
    [wand, kernT - 2 * wand, -kernB / 2 + wand / 2, 0],
  ];
  for (const [bx, bz, x, z] of kernSeiten) {
    const w = new THREE.BoxGeometry(bx, hoehe, bz);
    w.translate(x - 1.2, unten + hoehe / 2, z);
    teile.push(w);
  }
  return teile;
}

/** Gelaende rund um die Baugrube, aus vier Platten statt einer Aussparung. */
function baueGelaende() {
  const g = new THREE.Group();
  const tiefe = 3 * GH + 1.2;
  const rand = 46;
  const mat = new THREE.MeshStandardMaterial({ color: FARBE.gelaende, roughness: 0.96, metalness: 0 });

  // Nur die beiden abgewandten Seiten stehen. Zur Kamera hin ist das Gelaende
  // aufgeschnitten – sonst verdeckt der vordere Erdblock die Untergeschosse,
  // und genau die sollen hier zu sehen sein.
  const platten: [number, number, number, number][] = [
    [rand, (rand - GRUBE_Z) / 2, 0, -GRUBE_Z / 2 - (rand - GRUBE_Z) / 4],
    [(rand - GRUBE_X) / 2, GRUBE_Z, GRUBE_X / 2 + (rand - GRUBE_X) / 4, 0],
  ];
  for (const [bx, bz, x, z] of platten) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(bx, tiefe, bz), mat);
    m.position.set(x, -tiefe / 2, z);
    m.receiveShadow = true;
    g.add(m);
    g.add(kantenZu(m.geometry.clone().translate(x, -tiefe / 2, z), 0.22));
  }

  // Grubensohle
  const sohle = new THREE.Mesh(new THREE.BoxGeometry(GRUBE_X, 0.6, GRUBE_Z), mat);
  sohle.position.y = -tiefe - 0.3 + 0.6;
  sohle.receiveShadow = true;
  g.add(sohle);

  // Gelaendekante als feine Linie in Hausfarbe
  const kante = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(GRUBE_X, 0.02, GRUBE_Z)),
    new THREE.LineBasicMaterial({ color: FARBE.oxide, transparent: true, opacity: 0.6 })
  );
  g.add(kante);
  return g;
}

/** Vereinfachter Turmdrehkran: Mast, Ausleger, Gegenausleger, Haken. */
function baueKran() {
  const g = new THREE.Group();
  const stahl = new THREE.MeshStandardMaterial({ color: FARBE.oxide, roughness: 0.6, metalness: 0.2 });
  const hoehe = DACH * GH + 12;

  // Gitterturm: vier Eckstiele, waagerechte Riegel, gekreuzte Streben
  const mastB = 1.7;
  const stiel = 0.16;
  const teile: THREE.BufferGeometry[] = [];
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const p = new THREE.BoxGeometry(stiel, hoehe, stiel);
      p.translate((sx * (mastB - stiel)) / 2, hoehe / 2, (sz * (mastB - stiel)) / 2);
      teile.push(p);
    }
  }
  const schuss = 2.6;
  for (let y = schuss; y < hoehe; y += schuss) {
    for (const [bx, bz, x, z] of [
      [mastB, stiel * 0.8, 0, (mastB - stiel) / 2],
      [mastB, stiel * 0.8, 0, -(mastB - stiel) / 2],
      [stiel * 0.8, mastB, (mastB - stiel) / 2, 0],
      [stiel * 0.8, mastB, -(mastB - stiel) / 2, 0],
    ] as const) {
      const r = new THREE.BoxGeometry(bx, stiel * 0.8, bz);
      r.translate(x, y, z);
      teile.push(r);
    }
    // je Schuss eine Diagonale pro Seite, von Schuss zu Schuss gespiegelt
    const neigung = Math.round(y / schuss) % 2 === 0 ? 1 : -1;
    const lang = Math.hypot(schuss, mastB);
    const winkel = -neigung * Math.atan2(mastB, schuss);
    for (const seite of [1, -1]) {
      const dgl = new THREE.BoxGeometry(stiel * 0.7, lang, stiel * 0.7);
      const m = new THREE.Matrix4()
        .makeRotationZ(winkel)
        .setPosition(0, y - schuss / 2, (seite * (mastB - stiel)) / 2);
      dgl.applyMatrix4(m);
      teile.push(dgl);
    }
  }
  const mastGeo = zusammen(teile);
  const mast = new THREE.Mesh(mastGeo, stahl);
  mast.castShadow = true;
  g.add(mast, kantenZu(mastGeo, 0.35));

  const fuss = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.8, 4),
    new THREE.MeshStandardMaterial({ color: FARBE.beton, roughness: 0.95 })
  );
  fuss.position.y = 0.4;
  fuss.receiveShadow = true;
  g.add(fuss);

  // Dreharm: Ausleger nach vorn, Gegenausleger mit Ballast nach hinten
  const arm = new THREE.Group();
  arm.position.y = hoehe;
  const auslegerTeile: THREE.BufferGeometry[] = [];
  const aLang = 34;
  const aMitte = 15;
  for (const [y, z] of [
    [0.45, 0.4],
    [0.45, -0.4],
    [-0.45, 0],
  ] as const) {
    const gurt = new THREE.BoxGeometry(aLang, 0.16, 0.16);
    gurt.translate(aMitte, y, z);
    auslegerTeile.push(gurt);
  }
  for (let x = -aLang / 2 + 1.5; x < aLang / 2; x += 2.2) {
    const stab = new THREE.BoxGeometry(0.1, 1.0, 0.1);
    stab.translate(aMitte + x, 0, 0);
    auslegerTeile.push(stab);
  }
  const auslegerGeo = zusammen(auslegerTeile);
  const ausleger = new THREE.Mesh(auslegerGeo, stahl);
  ausleger.castShadow = true;
  arm.add(ausleger, kantenZu(auslegerGeo, 0.35));

  const gegen = new THREE.Mesh(new THREE.BoxGeometry(10, 0.9, 1.1), stahl);
  gegen.position.x = -6;
  arm.add(gegen);
  const ballast = new THREE.Mesh(
    new THREE.BoxGeometry(3, 1.6, 2.4),
    new THREE.MeshStandardMaterial({ color: FARBE.beton, roughness: 0.95 })
  );
  ballast.position.set(-9.5, -0.6, 0);
  ballast.castShadow = true;
  arm.add(ballast);

  // Laufkatze: Seil wird gestreckt, der Haken wandert mit – aber skaliert nicht mit
  const katze = new THREE.Group();
  const SEIL_EINHEIT = 1; // Zylinder mit Laenge 1, ueber scale.y auf Mass gebracht
  const seil = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, SEIL_EINHEIT, 6),
    new THREE.MeshStandardMaterial({ color: 0xd8d2cc, roughness: 0.8 })
  );
  katze.add(seil);
  const haken = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.7, 0.9),
    new THREE.MeshStandardMaterial({ color: 0xe8b23c, roughness: 0.5, metalness: 0.3 })
  );
  katze.add(haken);
  arm.add(katze);
  g.add(arm);

  /** Seillaenge in Metern setzen, ohne den Haken zu verzerren. */
  const seilSetzen = (laenge: number) => {
    const l = Math.max(1, laenge);
    seil.scale.y = l;
    seil.position.y = -l / 2;
    haken.position.y = -l;
  };
  seilSetzen(10);

  return { gruppe: g, arm, katze, seilSetzen, hoehe };
}

/** Gebaeudehuelle: geschlossene Fassade mit Fensterbaendern ueber Gelaende. */
function baueHuelle() {
  const g = new THREE.Group();
  const fassadeMat = new THREE.MeshStandardMaterial({
    color: FARBE.fassade,
    roughness: 0.85,
    metalness: 0.02,
    transparent: true,
    opacity: 0,
  });
  const glasMat = new THREE.MeshStandardMaterial({
    color: FARBE.glas,
    roughness: 0.25,
    metalness: 0.1,
    transparent: true,
    opacity: 0,
    emissive: new THREE.Color(FARBE.licht),
    emissiveIntensity: 0,
  });

  const d = 0.22;
  const hoehe = (DACH - 0) * GH;
  const seiten: [number, number, number, number, number][] = [
    [BREITE + 2 * d, d, 0, TIEFE / 2 + d / 2, 0],
    [BREITE + 2 * d, d, 0, -TIEFE / 2 - d / 2, 0],
    [d, TIEFE, BREITE / 2 + d / 2, 0, Math.PI / 2],
    [d, TIEFE, -BREITE / 2 - d / 2, 0, Math.PI / 2],
  ];
  for (const [bx, bz, x, z] of seiten) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(bx, hoehe, bz), fassadeMat);
    m.position.set(x, hoehe / 2, z);
    m.castShadow = true;
    g.add(m);
  }

  // Fenster je Geschoss: einzelne Scheiben statt durchlaufender Baender,
  // sonst wirkt die Fassade gestreift statt bebaut.
  const fensterH = 1.7;
  const scheiben: THREE.Mesh[] = [];
  const reihe = (laenge: number, anzahl: number) => {
    const luft = 0.55; // Pfeiler zwischen den Scheiben
    const breite = (laenge - luft * (anzahl - 1)) / anzahl;
    return Array.from({ length: anzahl }, (_, i) => ({
      breite,
      mitte: -laenge / 2 + breite / 2 + i * (breite + luft),
    }));
  };
  for (let e = 0; e <= DACH - 1; e++) {
    const y = e * GH + DECKE + (GH - DECKE - fensterH) / 2 + fensterH / 2;
    for (const seite of [1, -1]) {
      for (const f of reihe(BREITE - 2.6, 7)) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(f.breite, fensterH, 0.12), glasMat);
        m.position.set(f.mitte, y, seite * (TIEFE / 2 + d));
        scheiben.push(m);
        g.add(m);
      }
      for (const f of reihe(TIEFE - 2.6, 5)) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(f.breite, fensterH, 0.12), glasMat);
        m.position.set(seite * (BREITE / 2 + d), y, f.mitte);
        m.rotation.y = Math.PI / 2;
        scheiben.push(m);
        g.add(m);
      }
    }
  }

  // Attika und Technikaufbau auf dem Dach
  const attika = new THREE.Mesh(
    new THREE.BoxGeometry(BREITE + 2 * d, 1.0, TIEFE + 2 * d),
    fassadeMat
  );
  attika.position.y = hoehe + 0.5;
  g.add(attika);

  g.visible = false;
  return { gruppe: g, fassadeMat, glasMat, scheiben };
}

/* ── Hauptablauf ──────────────────────────────────────────────────── */

export interface Steuerung {
  zerstoere(): void;
}

export function starte(sektion: HTMLElement): Steuerung | null {
  const canvas = sektion.querySelector<HTMLCanvasElement>('[data-ga-canvas]');
  const buehne = sektion.querySelector<HTMLElement>('[data-ga-buehne]');
  if (!canvas || !buehne) return null;

  const de = (sektion.dataset.sprache ?? 'de') === 'de';
  const koten = [...sektion.querySelectorAll<HTMLElement>('[data-ebene]')];
  const anzeigeName = sektion.querySelector<HTMLElement>('[data-ga-name]');
  const anzeigeKote = sektion.querySelector<HTMLElement>('[data-ga-kote]');
  const knoepfe = [...sektion.querySelectorAll<HTMLButtonElement>('[data-stufe]')];
  const regler = sektion.querySelector<HTMLInputElement>('[data-ga-regler]');
  const texte = [...sektion.querySelectorAll<HTMLElement>('[data-stufentext]')];
  const grenze = sektion.querySelector<HTMLElement>('[data-ga-grenze]');

  const reduziert = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    sektion.dataset.gaZustand = 'ohne-webgl';
    return null;
  }

  const schmal = () => innerWidth < 900;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = !schmal();
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const szene = new THREE.Scene();
  szene.fog = new THREE.Fog(FARBE.grund, 120, 280);

  const kamera = new THREE.PerspectiveCamera(26, 1, 1, 600);

  const himmel = new THREE.HemisphereLight(0xdfe3e8, 0x16120f, 0.5);
  szene.add(himmel);
  const sonne = new THREE.DirectionalLight(0xfff2e2, 2.5);
  sonne.position.set(-40, 58, 38);
  sonne.castShadow = !schmal();
  sonne.shadow.mapSize.set(1024, 1024);
  Object.assign(sonne.shadow.camera, { left: -45, right: 45, top: 50, bottom: -35, near: 10, far: 190 });
  sonne.shadow.bias = -0.0005;
  sonne.shadow.normalBias = 0.04;
  szene.add(sonne);
  const gegenlicht = new THREE.DirectionalLight(0x93a7bd, 0.45);
  gegenlicht.position.set(42, 22, -38);
  szene.add(gegenlicht);

  szene.add(baueGelaende());

  /* Bauteile je Ebene: Decke schwebt ein, Tragwerk waechst aus der Decke. */
  const betonMat = (farbe: number) =>
    new THREE.MeshStandardMaterial({
      color: farbe,
      roughness: 0.92,
      metalness: 0,
      transparent: true,
      opacity: 0,
      // Flaechen minimal nach hinten: die Kantenlinien liegen sonst exakt
      // auf der Oberflaeche und fransen beim Bewegen aus.
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

  type Teil = { gruppe: THREE.Group; mat: THREE.MeshStandardMaterial; linien: THREE.LineSegments };
  const teilAus = (geos: THREE.BufferGeometry[], farbe: number, pivot: number | null): Teil => {
    const gruppe = new THREE.Group();
    const geo = geos.length === 1 ? geos[0]! : zusammen(geos);
    if (pivot !== null) {
      geo.translate(0, -pivot, 0);
      gruppe.position.y = pivot;
    }
    const mat = betonMat(farbe);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const linien = kantenZu(geo, 0);
    gruppe.add(mesh, linien);
    gruppe.visible = false;
    szene.add(gruppe);
    return { gruppe, mat, linien };
  };

  const ebenen = EBENEN.map((e, i) => ({
    ebene: e,
    index: i,
    decke: teilAus([deckenGeometrie(e)], e < 0 ? FARBE.wu : FARBE.deckePlatte, null),
    trag: teilAus(tragwerkGeometrien(e), e < 0 ? FARBE.wu : FARBE.beton, e * GH + DECKE),
  }));

  // Dachdecke und Aufbau
  const dachGeos = [deckenGeometrie(DACH)];
  const technik = new THREE.BoxGeometry(6, 2.2, 4.5);
  technik.translate(-2, DACH * GH + DECKE + 1.1, -2);
  ebenen.push({
    ebene: DACH,
    index: EBENEN.length,
    decke: teilAus(dachGeos, FARBE.deckePlatte, null),
    trag: teilAus([technik], FARBE.beton, DACH * GH + DECKE),
  });

  const kran = baueKran();
  kran.gruppe.position.set(20, 0, -14);
  kran.gruppe.visible = false;
  szene.add(kran.gruppe);

  const huelle = baueHuelle();
  szene.add(huelle.gruppe);

  /* ── Zustand ────────────────────────────────────────────────────── */
  let fortschritt = 0;
  let stufeZiel = 0;
  let stufeIst = 0;
  let eigeneStufe = false; // sobald der Besucher regelt, fuehrt nicht mehr das Scrollen
  let laeuft = false;
  let letzteEbene = Number.NaN;
  let zeit = 0;

  const stufeAusScroll = (p: number) => {
    if (p < WACHSEN_BIS + 0.06) return 0;
    const q = anteil(WACHSEN_BIS + 0.06, 1, p);
    return klemme(q * 2, 0, 2);
  };

  function groesseAnpassen() {
    const b = buehne!.clientWidth;
    const h = buehne!.clientHeight;
    if (!b || !h) return;
    renderer.setSize(b, h, false);
    kamera.aspect = b / h;
    kamera.updateProjectionMatrix();
  }

  function kameraSetzen(p: number) {
    const wachs = anteil(0, WACHSEN_BIS, p);
    const hoch = glatt(wachs);
    const eng = schmal();
    // Blick wandert von der Grube nach oben und zieht sich zurueck
    const dist = mix(eng ? 78 : 68, eng ? 124 : 114, hoch);
    const winkel = mix(-0.58, -0.40, hoch) + Math.sin(zeit * 0.08) * 0.014;
    const hoeheY = mix(6, DACH * GH * 0.72, hoch);
    // Auf breiten Schirmen steht links die Schrift: Zielpunkt nach links
    // ziehen, dann rutscht das Gebaeude in die rechte Bildhaelfte.
    const seite = eng ? mix(0, -1.5, hoch) : mix(-3, -13, hoch);
    kamera.position.set(Math.sin(winkel) * dist, hoeheY + mix(14, 22, hoch), Math.cos(winkel) * dist);
    kamera.lookAt(seite, mix(-8, DACH * GH * 0.42, hoch), 0);
  }

  function ebenenSetzen(p: number) {
    const wachs = anteil(0, WACHSEN_BIS, p);
    const n = ebenen.length;
    const schritt = 1 / n;
    let oberste = Number.NaN;

    for (const e of ebenen) {
      const start = e.index * schritt;
      const t = klemme((wachs - start) / (schritt * 1.35));
      if (t <= 0) {
        e.decke.gruppe.visible = false;
        e.trag.gruppe.visible = false;
        continue;
      }
      e.decke.gruppe.visible = true;
      e.trag.gruppe.visible = true;
      oberste = e.ebene;

      // Decke schwebt am Haken herunter
      const tD = ausQuart(klemme(t / 0.62));
      e.decke.gruppe.position.y = mix(FALLHOEHE, 0, tD);
      e.decke.mat.opacity = klemme(t / 0.3);
      (e.decke.linien.material as THREE.LineBasicMaterial).opacity = klemme(t / 0.4) * 0.5;

      // Tragwerk waechst aus der Decke
      const tT = glatt(klemme((t - 0.45) / 0.55));
      e.trag.gruppe.scale.y = Math.max(0.001, tT);
      e.trag.mat.opacity = tT;
      (e.trag.linien.material as THREE.LineBasicMaterial).opacity = tT * 0.45;
    }

    // Kran erscheint, sobald ueber Gelaende gebaut wird
    const kranAn = anteil(0.24, 0.34, wachs);
    kran.gruppe.visible = kranAn > 0.01;
    kran.gruppe.scale.setScalar(Math.max(0.001, glatt(kranAn)));
    kran.arm.rotation.y = -0.6 + wachs * 2.4 + Math.sin(zeit * 0.12) * 0.04;
    // Der Haken haengt ueber der Ebene, die gerade gesetzt wird
    const hakenZiel = Number.isNaN(oberste) ? -3 : oberste;
    kran.seilSetzen(klemme(kran.hoehe - (hakenZiel * GH + 7), 3, kran.hoehe - 2));
    kran.katze.position.x = mix(11, 17, 0.5 + Math.sin(zeit * 0.1) * 0.5);

    // Koten-Leiste und Anzeige
    if (oberste !== letzteEbene) {
      letzteEbene = oberste;
      for (const li of koten) {
        const e = Number(li.dataset.ebene);
        li.dataset.gaAktiv = !Number.isNaN(oberste) && e === Math.min(oberste, 7) ? 'ja' : 'nein';
        li.dataset.gaGebaut = !Number.isNaN(oberste) && e <= oberste ? 'ja' : 'nein';
      }
      const zeigeEbene = Number.isNaN(oberste) ? -3 : Math.min(oberste, 7);
      if (anzeigeName) anzeigeName.textContent = ebenenName(zeigeEbene, de);
      if (anzeigeKote) anzeigeKote.textContent = koteText(zeigeEbene);
    }
  }

  function stufeSetzen(wert: number) {
    stufeIst += (wert - stufeIst) * (reduziert ? 1 : 0.14);
    const h = klemme(stufeIst, 0, 1); // 0 → 1: Huelle schliesst sich
    const s = klemme(stufeIst - 1, 0, 1); // 1 → 2: Ausbau, Abendlicht

    huelle.gruppe.visible = h > 0.01;
    huelle.fassadeMat.opacity = h * 0.98;
    huelle.glasMat.opacity = h * 0.95;
    huelle.glasMat.emissiveIntensity = s * 0.85;
    huelle.glasMat.color.setHex(s > 0.4 ? FARBE.licht : FARBE.glas);

    // Abendstimmung bei schluesselfertig
    sonne.intensity = mix(2.5, 0.7, s);
    sonne.color.setHex(s > 0.5 ? 0xffc38f : 0xfff2e2);
    himmel.intensity = mix(0.5, 0.28, s);
    renderer.toneMappingExposure = mix(1.0, 0.92, s);

    // Solange das Scrollen fuehrt, laeuft der Regler mit
    if (!eigeneStufe && regler) regler.value = String(wert.toFixed(2));

    const stufe = Math.round(stufeIst);
    for (const k of knoepfe) {
      const an = Number(k.dataset.stufe) === stufe;
      k.setAttribute('aria-pressed', an ? 'true' : 'false');
    }
    for (const t of texte) {
      t.hidden = Number(t.dataset.stufentext) !== stufe;
    }
    const zeigeGrenze = fortschritt > WACHSEN_BIS - 0.04;
    if (grenze) grenze.dataset.gaSichtbar = zeigeGrenze ? 'ja' : 'nein';
    // Die Kotenleiste macht Platz, sobald die Stufen uebernehmen
    sektion.dataset.gaPhase = zeigeGrenze ? 'grenze' : 'wachsen';
  }

  function zeichne() {
    zeit += 1 / 60;
    kameraSetzen(fortschritt);
    ebenenSetzen(fortschritt);
    stufeSetzen(eigeneStufe ? stufeZiel : stufeAusScroll(fortschritt));
    renderer.render(szene, kamera);
  }

  /* ── Scrollfortschritt ──────────────────────────────────────────── */
  function fortschrittLesen() {
    const r = sektion.getBoundingClientRect();
    const strecke = r.height - innerHeight;
    fortschritt = strecke > 0 ? klemme(-r.top / strecke) : 0;
  }

  let schleife = 0;
  const tick = () => {
    schleife = requestAnimationFrame(tick);
    if (!laeuft) return;
    fortschrittLesen();
    zeichne();
  };

  const sichtbar = new IntersectionObserver(
    (eintraege) => {
      for (const e of eintraege) laeuft = e.isIntersecting;
    },
    { rootMargin: '200px 0px' }
  );
  sichtbar.observe(sektion);

  const beiGroesse = () => {
    groesseAnpassen();
    fortschrittLesen();
    zeichne();
  };
  addEventListener('resize', beiGroesse, { passive: true });

  /* ── Bedienung der Leistungsgrenze ──────────────────────────────── */
  const stufeWaehlen = (wert: number) => {
    eigeneStufe = true;
    stufeZiel = klemme(wert, 0, 2);
    if (regler) regler.value = String(stufeZiel);
  };
  for (const k of knoepfe) {
    k.addEventListener('click', () => stufeWaehlen(Number(k.dataset.stufe)));
  }
  regler?.addEventListener('input', () => stufeWaehlen(Number(regler.value)));

  groesseAnpassen();
  fortschrittLesen();
  if (reduziert) {
    // Ohne Bewegung: fertiges Gebaeude zeigen, nicht wachsen lassen
    fortschritt = 1;
    stufeIst = 1;
    zeichne();
  } else {
    tick();
  }
  sektion.dataset.gaZustand = 'bereit';

  return {
    zerstoere() {
      cancelAnimationFrame(schleife);
      sichtbar.disconnect();
      removeEventListener('resize', beiGroesse);
      renderer.dispose();
    },
  };
}

/** Mehrere Geometrien zu einer zusammenfassen – spart Zeichenaufrufe. */
function zusammen(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const ziel = new THREE.BufferGeometry();
  const pos: number[] = [];
  const norm: number[] = [];
  for (const g of geos) {
    const p = g.getAttribute('position');
    const n = g.getAttribute('normal');
    const idx = g.getIndex();
    const folge = idx ? Array.from(idx.array) : [...Array(p.count).keys()];
    for (const i of folge) {
      pos.push(p.getX(i), p.getY(i), p.getZ(i));
      if (n) norm.push(n.getX(i), n.getY(i), n.getZ(i));
    }
  }
  ziel.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  if (norm.length) ziel.setAttribute('normal', new THREE.Float32BufferAttribute(norm, 3));
  return ziel;
}
