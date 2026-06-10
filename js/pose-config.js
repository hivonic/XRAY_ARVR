// ==============================
// pose-config.js
// Semua data pose tubuh, pose awal tangan, dan pose awal kaki diletakkan di sini.
// ==============================


// ==============================
// POSE POSISI TUBUH
// Dipakai oleh tombol GANTI POSISI dan RESET SEMUA.
// BODY_POSES[0] adalah posisi initial/reset utama.
// ==============================

const BODY_POSES = [
  {
    name: 'Telentang',
    position: '0.9 0.95 0',
    rotation: '-90 90 0'
  },
  {
    name: 'Baring kanan',
    position: '0.9 1.15 0',
    rotation: '0 0 90'
  },
  {
    name: 'Tengkurap',
    position: '0.9 1.05 0',
    rotation: '90 -90 0'
  },
  {
    name: 'Baring kiri',
    position: '0.9 1.15 0',
    rotation: '0 180 -90'
  }
];


// ==============================
// BATAS RUANGAN
// ==============================

const ROOM_LIMIT = {
  minX: -4.5,
  maxX: 4.5,
  minZ: -4.5,
  maxZ: 4.5
};

const XRAY_TABLE_LIMIT = {
  minX: -1.55,
  maxX: 1.55,
  minZ: -0.55,
  maxZ: 0.55
};


// ==============================
// BONE JARI
// ==============================

const RIGHT_FINGER_BONES = [
  'thumb_01_r_087', 'thumb_02_r_088', 'thumb_03_r_089',
  'index_01_r_084', 'index_02_r_085', 'index_03_r_086',
  'middle_01_r_080', 'middle_02_r_081', 'middle_03_r_082',
  'ring_01_r_076', 'ring_02_r_077', 'ring_03_r_078',
  'pinky_01_r_072', 'pinky_02_r_073', 'pinky_03_r_074'
];

const LEFT_FINGER_BONES = [
  'thumb_01_l_033', 'thumb_02_l_034', 'thumb_03_l_035',
  'index_01_l_026', 'index_02_l_027', 'index_03_l_028',
  'middle_01_l_030', 'middle_02_l_031', 'middle_03_l_032',
  'ring_01_l_041', 'ring_02_l_042', 'ring_03_l_043',
  'pinky_01_l_037', 'pinky_02_l_038', 'pinky_03_l_039'
];


// ==============================
// INITIAL POSE TANGAN
// Satuan derajat.
// Ubah angka di sini untuk mengatur pose awal/reset tangan.
// ==============================

const INITIAL_ARM_POSE = {
  // Tangan kanan
  rightUpperX: 85,
  rightUpperY: 0,
  rightUpperZ: 75,

  rightLowerX: 0,
  rightLowerY: 0,
  rightLowerZ: 0,

  rightHandX: -90,
  rightHandY: 0,
  rightHandZ: 0,

  rightFinger: 0,

  // Tangan kiri
  leftUpperX: 85,
  leftUpperY: 0,
  leftUpperZ: -75,

  leftLowerX: 0,
  leftLowerY: 0,
  leftLowerZ: 0,

  leftHandX: -90,
  leftHandY: 0,
  leftHandZ: 0,

  leftFinger: 0
};


// ==============================
// INITIAL POSE KAKI
// Satuan derajat.
// Ubah angka di sini untuk mengatur pose awal/reset kaki.
// ==============================

const INITIAL_LEG_POSE = {
  // Kaki kanan
  rightUpperX: 180,
  rightUpperY: 180,
  rightUpperZ: 0,

  rightLowerX: 0,
  rightLowerY: 0,
  rightLowerZ: -10,

  rightFootX: 0,
  rightFootY: 0,
  rightFootZ: 0,

  // Kaki kiri
  leftUpperX: 0,
  leftUpperY: 0,
  leftUpperZ: 0,

  leftLowerX: 0,
  leftLowerY: 0,
  leftLowerZ: -10,

  leftFootX: 0,
  leftFootY: 0,
  leftFootZ: 0
};