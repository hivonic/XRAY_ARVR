// ==============================
// helpers.js
// Fungsi umum yang dipakai banyak component.
// ==============================

function getMaleBodyModel() {
  const body = document.querySelector('#maleBodyModel');

  if (!body) return null;

  const model = body.getObject3D('mesh');

  if (!model) return null;

  return model;
}

function getMaleBodyBones() {
  const model = getMaleBodyModel();

  if (!model) return null;

  const bones = {};

  model.traverse((node) => {
    if (node.isBone) {
      bones[node.name] = node;
    }
  });

  return bones;
}

function updateMaleBodyMatrix() {
  const model = getMaleBodyModel();

  if (!model) return;

  model.updateMatrixWorld(true);
}

function stopAllBoneGrabs() {
  const grabEntities = document.querySelectorAll('[bone-grab-control]');

  grabEntities.forEach((entity) => {
    const grabComponent = entity.components['bone-grab-control'];

    if (grabComponent && grabComponent.isGrabbed) {
      grabComponent.stopGrab();
    }
  });
}

function clampRadians(valueRad, minDeg, maxDeg) {
  const minRad = THREE.MathUtils.degToRad(minDeg);
  const maxRad = THREE.MathUtils.degToRad(maxDeg);

  return Math.max(minRad, Math.min(maxRad, valueRad));
}