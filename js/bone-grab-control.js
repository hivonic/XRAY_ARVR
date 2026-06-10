// ==============================
// bone-grab-control.js
// Component untuk grab dan menggerakkan bone.
// Desktop:
// - Tahan klik tengah / scroll wheel pada sphere
// - Drag mouse untuk mengubah arah tangan/kaki
// - Lepas klik tengah untuk berhenti
//
// VR:
// - Tetap bisa memakai controller trigger/click dari laser-controls
// ==============================

AFRAME.registerComponent('bone-grab-control', {
  schema: {
    side: { type: 'string', default: 'right' },
    part: { type: 'string', default: 'upper' }
  },

  init: function () {
    this.isGrabbed = false;
    this.isHovered = false;

    this.mode = null; // 'mouse' atau 'controller'

    this.controller = null;
    this.bone = null;

    this.startControllerPos = new THREE.Vector3();
    this.currentControllerPos = new THREE.Vector3();

    this.startMouseX = 0;
    this.startMouseY = 0;
    this.currentMouseX = 0;
    this.currentMouseY = 0;

    this.startRotation = {
      x: 0,
      y: 0,
      z: 0
    };

    const currentMaterial = this.el.getAttribute('material');

    this.originalColor = currentMaterial && currentMaterial.color
      ? currentMaterial.color
      : '#ffff00';

    this.originalOpacity = currentMaterial && currentMaterial.opacity
      ? currentMaterial.opacity
      : 0.25;

    // ==============================
    // HOVER SPHERE
    // Dipakai agar klik tengah hanya aktif kalau cursor berada di sphere.
    // ==============================

    this.el.addEventListener('mouseenter', () => {
      this.isHovered = true;
    });

    this.el.addEventListener('mouseleave', () => {
      this.isHovered = false;
    });

    // ==============================
    // DESKTOP MODE
    // Klik tengah tahan untuk grab.
    // ==============================

    this.onMouseDown = (event) => {
      // button 1 = middle mouse / scroll wheel
      if (event.button !== 1) return;

      if (!this.isHovered) return;

      event.preventDefault();

      if (!this.isGrabbed) {
        this.startMouseGrab(event);
      }
    };

    this.onMouseMove = (event) => {
      if (!this.isGrabbed || this.mode !== 'mouse') return;

      this.currentMouseX = event.clientX;
      this.currentMouseY = event.clientY;
    };

    this.onMouseUp = (event) => {
      if (event.button !== 1) return;

      if (this.isGrabbed && this.mode === 'mouse') {
        event.preventDefault();
        this.stopGrab();
      }
    };

    this.onAuxClick = (event) => {
      // Mencegah browser membuka autoscroll / tab baru saat middle click.
      if (event.button === 1) {
        event.preventDefault();
      }
    };

    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('auxclick', this.onAuxClick);

    // ==============================
    // VR MODE
    // Click dari controller tetap boleh.
    // Click dari mouse kiri diabaikan.
    // ==============================

    this.el.addEventListener('click', (event) => {
      const cursorEl = event.detail && event.detail.cursorEl;

      // Kalau click berasal dari mouse cursor desktop, abaikan.
      // Jadi left click tidak akan mengaktifkan grab.
      if (!cursorEl) return;

      if (cursorEl.id !== 'rightHand' && cursorEl.id !== 'leftHand') {
        return;
      }

      if (!this.isGrabbed) {
        this.startControllerGrab(cursorEl);
      } else {
        this.stopGrab();
      }
    });
  },

  remove: function () {
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('auxclick', this.onAuxClick);
  },

  getTargetBone: function () {
    const bones = getMaleBodyBones();

    if (!bones) {
      console.log('Bones belum terbaca untuk grab.');
      return null;
    }

    // ==============================
    // TANGAN KANAN
    // ==============================

    if (this.data.side === 'right' && this.data.part === 'upper') {
      return bones['upperarm_r_059'];
    }

    if (this.data.side === 'right' && this.data.part === 'lower') {
      return bones['lowerarm_r_060'];
    }

    // ==============================
    // TANGAN KIRI
    // ==============================

    if (this.data.side === 'left' && this.data.part === 'upper') {
      return bones['upperarm_l_013'];
    }

    if (this.data.side === 'left' && this.data.part === 'lower') {
      return bones['lowerarm_l_014'];
    }

    // ==============================
    // KAKI KANAN
    // ==============================

    if (this.data.side === 'right' && this.data.part === 'upperLeg') {
      return bones['thigh_r_0106'];
    }

    if (this.data.side === 'right' && this.data.part === 'lowerLeg') {
      return bones['calf_r_0107'];
    }

    // ==============================
    // KAKI KIRI
    // ==============================

    if (this.data.side === 'left' && this.data.part === 'upperLeg') {
      return bones['thigh_l_0130'];
    }

    if (this.data.side === 'left' && this.data.part === 'lowerLeg') {
      return bones['calf_l_0131'];
    }

    return null;
  },

  saveStartRotation: function () {
    this.startRotation.x = this.bone.rotation.x;
    this.startRotation.y = this.bone.rotation.y;
    this.startRotation.z = this.bone.rotation.z;
  },

  startMouseGrab: function (event) {
    this.bone = this.getTargetBone();

    if (!this.bone) {
      console.log('Bone tidak ditemukan:', this.data.side, this.data.part);
      return;
    }

    this.mode = 'mouse';
    this.controller = null;

    this.startMouseX = event.clientX;
    this.startMouseY = event.clientY;

    this.currentMouseX = event.clientX;
    this.currentMouseY = event.clientY;

    this.saveStartRotation();

    this.isGrabbed = true;

    this.el.setAttribute('material', 'color', '#00ff00');
    this.el.setAttribute('material', 'opacity', 0.45);

    console.log('Mouse middle grab aktif:', this.data.side, this.data.part);
  },

  startControllerGrab: function (cursorEl) {
    this.bone = this.getTargetBone();

    if (!this.bone) {
      console.log('Bone tidak ditemukan:', this.data.side, this.data.part);
      return;
    }

    this.mode = 'controller';
    this.controller = cursorEl;

    this.controller.object3D.getWorldPosition(this.startControllerPos);

    this.saveStartRotation();

    this.isGrabbed = true;

    this.el.setAttribute('material', 'color', '#00ff00');
    this.el.setAttribute('material', 'opacity', 0.45);

    console.log('Controller grab aktif:', this.data.side, this.data.part);
  },

  stopGrab: function () {
    this.isGrabbed = false;
    this.mode = null;
    this.controller = null;

    this.el.setAttribute('material', 'color', this.originalColor);
    this.el.setAttribute('material', 'opacity', this.originalOpacity);

    console.log('Grab dilepas:', this.data.side, this.data.part);
  },

  applyMouseRotation: function () {
    const mouseSensitivity = 0.012;

    const deltaX = (this.currentMouseX - this.startMouseX) * mouseSensitivity;
    const deltaY = (this.startMouseY - this.currentMouseY) * mouseSensitivity;

    let rotX = this.startRotation.x;
    let rotY = this.startRotation.y;
    let rotZ = this.startRotation.z;

    // ==============================
    // TANGAN KANAN
    // ==============================

    if (this.data.side === 'right') {
      if (this.data.part === 'upper') {
        rotX += deltaY * 1.2;
        rotZ += deltaX * 1.2;
      }

      if (this.data.part === 'lower') {
        rotX += deltaY * 1.0;
        rotZ += deltaX * 1.0;
      }

      if (this.data.part === 'upperLeg') {
        rotX += deltaY * 1.1;
        rotZ += deltaX * 1.1;
      }

      if (this.data.part === 'lowerLeg') {
        rotX += deltaY * 0.9;
        rotZ += deltaX * 0.9;
      }
    }

    // ==============================
    // TANGAN KIRI
    // ==============================

    if (this.data.side === 'left') {
      if (this.data.part === 'upper') {
        rotX += deltaY * 1.2;
        rotZ += deltaX * 1.2;
      }

      if (this.data.part === 'lower') {
        rotX += deltaY * 1.0;
        rotZ += deltaX * 1.0;
      }

      if (this.data.part === 'upperLeg') {
        rotX += deltaY * 1.1;
        rotZ += deltaX * 1.1;
      }

      if (this.data.part === 'lowerLeg') {
        rotX += deltaY * 0.9;
        rotZ += deltaX * 0.9;
      }
    }

    const limitedRotation = applyBoneRotationLimit(
      this.data.side,
      this.data.part,
      rotX,
      rotY,
      rotZ
    );

    this.bone.rotation.x = limitedRotation.x;
    this.bone.rotation.y = limitedRotation.y;
    this.bone.rotation.z = limitedRotation.z;
  },

  applyControllerRotation: function () {
    if (!this.controller) return;

    this.controller.object3D.getWorldPosition(this.currentControllerPos);

    const delta = new THREE.Vector3();
    delta.subVectors(this.currentControllerPos, this.startControllerPos);

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    let rotX = this.startRotation.x;
    let rotY = this.startRotation.y;
    let rotZ = this.startRotation.z;

    // ==============================
    // TANGAN KANAN
    // ==============================

    if (this.data.side === 'right') {
      if (this.data.part === 'upper') {
        rotX += clamp(delta.z * 2.0, -1.2, 1.2);
        rotZ += clamp(-delta.y * 2.0 + delta.x * 1.2, -1.4, 1.4);
      }

      if (this.data.part === 'lower') {
        rotX += clamp(delta.z * 1.6, -1.0, 1.0);
        rotZ += clamp(-delta.y * 1.8 + delta.x * 0.8, -1.2, 1.2);
      }

      if (this.data.part === 'upperLeg') {
        rotX += clamp(delta.z * 2.0, -1.2, 1.2);
        rotZ += clamp(-delta.y * 1.4 + delta.x * 1.0, -1.2, 1.2);
      }

      if (this.data.part === 'lowerLeg') {
        rotX += clamp(delta.z * 1.5, -1.0, 1.0);
        rotZ += clamp(-delta.y * 1.1 + delta.x * 0.7, -1.0, 1.0);
      }
    }

    // ==============================
    // TANGAN KIRI
    // ==============================

    if (this.data.side === 'left') {
      if (this.data.part === 'upper') {
        rotX += clamp(delta.z * 2.0, -1.2, 1.2);
        rotZ += clamp(delta.y * 2.0 + delta.x * 1.2, -1.4, 1.4);
      }

      if (this.data.part === 'lower') {
        rotX += clamp(delta.z * 1.6, -1.0, 1.0);
        rotZ += clamp(delta.y * 1.8 + delta.x * 0.8, -1.2, 1.2);
      }

      if (this.data.part === 'upperLeg') {
        rotX += clamp(delta.z * 2.0, -1.2, 1.2);
        rotZ += clamp(delta.y * 1.4 + delta.x * 1.0, -1.2, 1.2);
      }

      if (this.data.part === 'lowerLeg') {
        rotX += clamp(delta.z * 1.5, -1.0, 1.0);
        rotZ += clamp(delta.y * 1.1 + delta.x * 0.7, -1.0, 1.0);
      }
    }

    const limitedRotation = applyBoneRotationLimit(
      this.data.side,
      this.data.part,
      rotX,
      rotY,
      rotZ
    );

    this.bone.rotation.x = limitedRotation.x;
    this.bone.rotation.y = limitedRotation.y;
    this.bone.rotation.z = limitedRotation.z;
  },

  tick: function () {
    if (!this.isGrabbed || !this.bone) return;

    if (this.mode === 'mouse') {
      this.applyMouseRotation();
    }

    if (this.mode === 'controller') {
      this.applyControllerRotation();
    }

    updateMaleBodyMatrix();
  }
});