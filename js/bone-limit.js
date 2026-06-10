// ==============================
// bone-limit.js
// Batas rotasi tulang.
// Memakai absolute limit.
// ==============================

function applyBoneRotationLimit(side, part, rotX, rotY, rotZ) {
  // ==============================
  // TANGAN KANAN
  // ==============================

  if (side === 'right' && part === 'upper') {
    rotX = clampRadians(rotX, -130, 130);
    rotY = clampRadians(rotY, -35, 35);
    rotZ = clampRadians(rotZ, -130, 130);
  }

  if (side === 'right' && part === 'lower') {
    rotX = clampRadians(rotX, -35, 35);
    rotY = clampRadians(rotY, -15, 15);
    rotZ = clampRadians(rotZ, -145, 0);
  }

  // ==============================
  // TANGAN KIRI
  // ==============================

  if (side === 'left' && part === 'upper') {
    rotX = clampRadians(rotX, -130, 130);
    rotY = clampRadians(rotY, -35, 35);
    rotZ = clampRadians(rotZ, -130, 130);
  }

  if (side === 'left' && part === 'lower') {
    rotX = clampRadians(rotX, -35, 35);
    rotY = clampRadians(rotY, -15, 15);
    rotZ = clampRadians(rotZ, -145, 0);
  }

  // ==============================
  // KAKI KANAN
  // ==============================

  if (side === 'right' && part === 'upperLeg') {
    // Karena initial kaki kanan kamu memakai X 180 dan Y 180.
    rotX = clampRadians(rotX, 130, 230);
    rotY = clampRadians(rotY, 130, 230);
    rotZ = clampRadians(rotZ, -45, 110);
  }

  if (side === 'right' && part === 'lowerLeg') {
    rotX = clampRadians(rotX, -8, 8);
    rotY = clampRadians(rotY, -8, 8);
    rotZ = clampRadians(rotZ, -160, 0);
  }

  // ==============================
  // KAKI KIRI
  // ==============================

  if (side === 'left' && part === 'upperLeg') {
    rotX = clampRadians(rotX, -50, 50);
    rotY = clampRadians(rotY, -30, 30);
    rotZ = clampRadians(rotZ, -45, 110);
  }

  if (side === 'left' && part === 'lowerLeg') {
    rotX = clampRadians(rotX, -8, 8);
    rotY = clampRadians(rotY, -8, 8);
    rotZ = clampRadians(rotZ, -160, 0);
  }

  return {
    x: rotX,
    y: rotY,
    z: rotZ
  };
}