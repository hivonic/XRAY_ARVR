// ==============================
// body-pose-components.js
// Component pose tubuh dan scanner bone.
// ==============================

AFRAME.registerComponent('cycle-body-pose', {
  init: function () {
    this.poseIndex = 0;
    this.poses = BODY_POSES;

    this.el.addEventListener('click', () => {
      stopAllBoneGrabs();

      const body = document.querySelector('#maleBodyModel');

      if (!body) {
        console.log('maleBodyModel tidak ditemukan.');
        return;
      }

      this.poseIndex++;

      if (this.poseIndex >= this.poses.length) {
        this.poseIndex = 0;
      }

      const pose = this.poses[this.poseIndex];

      body.setAttribute('position', pose.position);
      body.setAttribute('rotation', pose.rotation);

      updateMaleBodyMatrix();

      console.log('Posisi tubuh sekarang:', pose.name);
    });
  }
});

AFRAME.registerComponent('bone-scanner', {
  init: function () {
    this.el.addEventListener('model-loaded', () => {
      const model = this.el.getObject3D('mesh');

      console.log('=== BONE SCANNER START ===');

      let boneCount = 0;

      if (!model) {
        console.log('Model belum terbaca.');
        console.log('=== BONE SCANNER END ===');
        return;
      }

      model.traverse((node) => {
        if (node.isBone) {
          boneCount++;
          console.log('Bone:', node.name);
        }
      });

      console.log('Total bone ditemukan:', boneCount);
      console.log('=== BONE SCANNER END ===');
    });
  }
});

AFRAME.registerComponent('initial-arm-pose', {
  init: function () {
    this.el.addEventListener('model-loaded', () => {
      const initialPose = BODY_POSES[0];

      this.el.setAttribute('position', initialPose.position);
      this.el.setAttribute('rotation', initialPose.rotation);

      applyInitialArmPose('all');
      applyInitialLegPose('all');

      updateMaleBodyMatrix();

      console.log('Initial pose tubuh, tangan, dan kaki sudah diterapkan.');
    });
  }
});