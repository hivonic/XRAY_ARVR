// ==============================
// reset-components.js
// Fungsi initial pose dan tombol reset.
// ==============================

function applyInitialArmPose(side) {
  const bones = getMaleBodyBones();
  const deg = THREE.MathUtils.degToRad;

  if (!bones) {
    console.log('Bones belum terbaca untuk reset tangan.');
    return;
  }

  // ==============================
  // TANGAN KANAN
  // ==============================

  if (side === 'right' || side === 'all') {
    if (bones['upperarm_r_059']) {
      bones['upperarm_r_059'].rotation.x = deg(INITIAL_ARM_POSE.rightUpperX);
      bones['upperarm_r_059'].rotation.y = deg(INITIAL_ARM_POSE.rightUpperY || 0);
      bones['upperarm_r_059'].rotation.z = -deg(INITIAL_ARM_POSE.rightUpperZ);
    }

    if (bones['lowerarm_r_060']) {
      bones['lowerarm_r_060'].rotation.x = deg(INITIAL_ARM_POSE.rightLowerX);
      bones['lowerarm_r_060'].rotation.y = deg(INITIAL_ARM_POSE.rightLowerY || 0);
      bones['lowerarm_r_060'].rotation.z = -deg(INITIAL_ARM_POSE.rightLowerZ);
    }

    if (bones['hand_r_068']) {
      bones['hand_r_068'].rotation.x = deg(INITIAL_ARM_POSE.rightHandX);
      bones['hand_r_068'].rotation.y = deg(INITIAL_ARM_POSE.rightHandY || 0);
      bones['hand_r_068'].rotation.z = -deg(INITIAL_ARM_POSE.rightHandZ);
    }

    RIGHT_FINGER_BONES.forEach((boneName) => {
      if (bones[boneName]) {
        bones[boneName].rotation.x = deg(INITIAL_ARM_POSE.rightFinger);
        bones[boneName].rotation.y = 0;
        bones[boneName].rotation.z = 0;
      }
    });
  }

  // ==============================
  // TANGAN KIRI
  // ==============================

  if (side === 'left' || side === 'all') {
    if (bones['upperarm_l_013']) {
      bones['upperarm_l_013'].rotation.x = deg(INITIAL_ARM_POSE.leftUpperX);
      bones['upperarm_l_013'].rotation.y = deg(INITIAL_ARM_POSE.leftUpperY || 0);
      bones['upperarm_l_013'].rotation.z = deg(INITIAL_ARM_POSE.leftUpperZ);
    }

    if (bones['lowerarm_l_014']) {
      bones['lowerarm_l_014'].rotation.x = deg(INITIAL_ARM_POSE.leftLowerX);
      bones['lowerarm_l_014'].rotation.y = deg(INITIAL_ARM_POSE.leftLowerY || 0);
      bones['lowerarm_l_014'].rotation.z = deg(INITIAL_ARM_POSE.leftLowerZ);
    }

    if (bones['hand_l_022']) {
      bones['hand_l_022'].rotation.x = deg(INITIAL_ARM_POSE.leftHandX);
      bones['hand_l_022'].rotation.y = deg(INITIAL_ARM_POSE.leftHandY || 0);
      bones['hand_l_022'].rotation.z = deg(INITIAL_ARM_POSE.leftHandZ);
    }

    LEFT_FINGER_BONES.forEach((boneName) => {
      if (bones[boneName]) {
        bones[boneName].rotation.x = deg(INITIAL_ARM_POSE.leftFinger);
        bones[boneName].rotation.y = 0;
        bones[boneName].rotation.z = 0;
      }
    });
  }

  updateMaleBodyMatrix();

  console.log('Reset arm pose:', side);
}

function applyInitialLegPose(side) {
  const bones = getMaleBodyBones();
  const deg = THREE.MathUtils.degToRad;

  if (!bones) {
    console.log('Bones belum terbaca untuk reset kaki.');
    return;
  }

  // ==============================
  // KAKI KANAN
  // ==============================

  if (side === 'right' || side === 'all') {
    if (bones['thigh_r_0106']) {
      bones['thigh_r_0106'].rotation.x = deg(INITIAL_LEG_POSE.rightUpperX);
      bones['thigh_r_0106'].rotation.y = deg(INITIAL_LEG_POSE.rightUpperY);
      bones['thigh_r_0106'].rotation.z = deg(INITIAL_LEG_POSE.rightUpperZ);
    }

    if (bones['calf_r_0107']) {
      bones['calf_r_0107'].rotation.x = deg(INITIAL_LEG_POSE.rightLowerX);
      bones['calf_r_0107'].rotation.y = deg(INITIAL_LEG_POSE.rightLowerY);
      bones['calf_r_0107'].rotation.z = deg(INITIAL_LEG_POSE.rightLowerZ);
    }

    if (bones['foot_r_0108']) {
      bones['foot_r_0108'].rotation.x = deg(INITIAL_LEG_POSE.rightFootX);
      bones['foot_r_0108'].rotation.y = deg(INITIAL_LEG_POSE.rightFootY);
      bones['foot_r_0108'].rotation.z = deg(INITIAL_LEG_POSE.rightFootZ);
    }
  }

  // ==============================
  // KAKI KIRI
  // ==============================

  if (side === 'left' || side === 'all') {
    if (bones['thigh_l_0130']) {
      bones['thigh_l_0130'].rotation.x = deg(INITIAL_LEG_POSE.leftUpperX);
      bones['thigh_l_0130'].rotation.y = deg(INITIAL_LEG_POSE.leftUpperY);
      bones['thigh_l_0130'].rotation.z = deg(INITIAL_LEG_POSE.leftUpperZ);
    }

    if (bones['calf_l_0131']) {
      bones['calf_l_0131'].rotation.x = deg(INITIAL_LEG_POSE.leftLowerX);
      bones['calf_l_0131'].rotation.y = deg(INITIAL_LEG_POSE.leftLowerY);
      bones['calf_l_0131'].rotation.z = deg(INITIAL_LEG_POSE.leftLowerZ);
    }

    if (bones['foot_l_0132']) {
      bones['foot_l_0132'].rotation.x = deg(INITIAL_LEG_POSE.leftFootX);
      bones['foot_l_0132'].rotation.y = deg(INITIAL_LEG_POSE.leftFootY);
      bones['foot_l_0132'].rotation.z = deg(INITIAL_LEG_POSE.leftFootZ);
    }
  }

  updateMaleBodyMatrix();

  console.log('Reset leg pose:', side);
}

AFRAME.registerComponent('reset-body-and-arm-pose', {
  init: function () {
    this.el.addEventListener('click', () => {
      stopAllBoneGrabs();

      const body = document.querySelector('#maleBodyModel');

      if (!body) {
        console.log('maleBodyModel tidak ditemukan.');
        return;
      }

      const initialPose = BODY_POSES[0];

      body.setAttribute('position', initialPose.position);
      body.setAttribute('rotation', initialPose.rotation);

      applyInitialArmPose('all');
      applyInitialLegPose('all');

      updateMaleBodyMatrix();

      console.log('Reset tubuh, tangan, dan kaki ke initial pose.');
    });
  }
});

AFRAME.registerComponent('reset-arm-pose', {
  schema: {
    side: { type: 'string', default: 'right' }
  },

  init: function () {
    this.el.addEventListener('click', () => {
      stopAllBoneGrabs();

      applyInitialArmPose(this.data.side);

      console.log('Reset tangan:', this.data.side);
    });
  }
});

AFRAME.registerComponent('reset-leg-pose', {
  schema: {
    side: { type: 'string', default: 'right' }
  },

  init: function () {
    this.el.addEventListener('click', () => {
      stopAllBoneGrabs();

      applyInitialLegPose(this.data.side);

      console.log('Reset kaki:', this.data.side);
    });
  }
});