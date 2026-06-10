// ==============================
// bone-follow-anchor.js
// Component agar sphere grab menempel ke bone.
// ==============================

AFRAME.registerComponent('bone-follow-anchor', {
  schema: {
    side: { type: 'string', default: 'right' },
    part: { type: 'string', default: 'upper' },

    target: { type: 'string', default: 'mid' },

    offsetX: { type: 'number', default: 0 },
    offsetY: { type: 'number', default: 0 },
    offsetZ: { type: 'number', default: 0 }
  },

  init: function () {
    this.body = null;
    this.model = null;

    this.startBone = null;
    this.endBone = null;

    this.startBoneName = '';
    this.endBoneName = '';

    this.startWorldPos = new THREE.Vector3();
    this.endWorldPos = new THREE.Vector3();
    this.worldPos = new THREE.Vector3();
    this.localPos = new THREE.Vector3();

    if (this.data.side === 'right' && this.data.part === 'upper') {
      this.startBoneName = 'upperarm_r_059';
      this.endBoneName = 'lowerarm_r_060';
    }

    if (this.data.side === 'right' && this.data.part === 'lower') {
      this.startBoneName = 'lowerarm_r_060';
      this.endBoneName = 'hand_r_068';
    }

    if (this.data.side === 'left' && this.data.part === 'upper') {
      this.startBoneName = 'upperarm_l_013';
      this.endBoneName = 'lowerarm_l_014';
    }

    if (this.data.side === 'left' && this.data.part === 'lower') {
      this.startBoneName = 'lowerarm_l_014';
      this.endBoneName = 'hand_l_022';
    }

    if (this.data.side === 'right' && this.data.part === 'upperLeg') {
      this.startBoneName = 'thigh_r_0106';
      this.endBoneName = 'calf_r_0107';
    }

    if (this.data.side === 'right' && this.data.part === 'lowerLeg') {
      this.startBoneName = 'calf_r_0107';
      this.endBoneName = 'foot_r_0108';
    }

    if (this.data.side === 'left' && this.data.part === 'upperLeg') {
      this.startBoneName = 'thigh_l_0130';
      this.endBoneName = 'calf_l_0131';
    }

    if (this.data.side === 'left' && this.data.part === 'lowerLeg') {
      this.startBoneName = 'calf_l_0131';
      this.endBoneName = 'foot_l_0132';
    }
  },

  findBones: function () {
    this.body = document.querySelector('#maleBodyModel');

    if (!this.body) return false;

    this.model = this.body.getObject3D('mesh');

    if (!this.model) return false;

    let foundStartBone = null;
    let foundEndBone = null;

    this.model.traverse((node) => {
      if (node.isBone && node.name === this.startBoneName) {
        foundStartBone = node;
      }

      if (node.isBone && node.name === this.endBoneName) {
        foundEndBone = node;
      }
    });

    if (!foundStartBone) {
      console.log('Start bone tidak ditemukan:', this.startBoneName);
      return false;
    }

    if (!foundEndBone) {
      console.log('End bone tidak ditemukan:', this.endBoneName);
      return false;
    }

    this.startBone = foundStartBone;
    this.endBone = foundEndBone;

    return true;
  },

  tick: function () {
    if (!this.startBone || !this.endBone) {
      const found = this.findBones();
      if (!found) return;
    }

    if (this.model) {
      this.model.updateMatrixWorld(true);
    }

    this.startBone.updateWorldMatrix(true, false);
    this.endBone.updateWorldMatrix(true, false);

    this.startBone.getWorldPosition(this.startWorldPos);
    this.endBone.getWorldPosition(this.endWorldPos);

    if (this.data.target === 'start') {
      this.worldPos.copy(this.startWorldPos);
    } else if (this.data.target === 'end') {
      this.worldPos.copy(this.endWorldPos);
    } else {
      this.worldPos.copy(this.startWorldPos);
      this.worldPos.lerp(this.endWorldPos, 0.5);
    }

    this.worldPos.x += this.data.offsetX;
    this.worldPos.y += this.data.offsetY;
    this.worldPos.z += this.data.offsetZ;

    this.localPos.copy(this.worldPos);

    if (this.el.parentEl) {
      this.el.parentEl.object3D.worldToLocal(this.localPos);
    }

    this.el.object3D.position.copy(this.localPos);
  }
});