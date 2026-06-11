// ==============================
// grab-anchor-builder.js
// Membuat semua sphere grab tangan dan kaki secara otomatis.
// Sphere hanya terlihat kalau user berada dalam jarak tertentu.
// Jarak pandang hanya berlaku untuk a-sphere grab, bukan text/object lain.
// ==============================

AFRAME.registerComponent('body-grab-anchors', {
  init: function () {
    const anchors = [
      {
        anchorId: 'anchorUpperRight',
        grabId: 'grabUpperRight',
        side: 'right',
        part: 'upper',
        radius: 0.1
      },
      {
        anchorId: 'anchorLowerRight',
        grabId: 'grabLowerRight',
        side: 'right',
        part: 'lower',
        radius: 0.1
      },
      {
        anchorId: 'anchorUpperLeft',
        grabId: 'grabUpperLeft',
        side: 'left',
        part: 'upper',
        radius: 0.1
      },
      {
        anchorId: 'anchorLowerLeft',
        grabId: 'grabLowerLeft',
        side: 'left',
        part: 'lower',
        radius: 0.1
      },
      {
        anchorId: 'anchorUpperLegRight',
        grabId: 'grabUpperLegRight',
        side: 'right',
        part: 'upperLeg',
        radius: 0.12
      },
      {
        anchorId: 'anchorLowerLegRight',
        grabId: 'grabLowerLegRight',
        side: 'right',
        part: 'lowerLeg',
        radius: 0.1
      },
      {
        anchorId: 'anchorUpperLegLeft',
        grabId: 'grabUpperLegLeft',
        side: 'left',
        part: 'upperLeg',
        radius: 0.12
      },
      {
        anchorId: 'anchorLowerLegLeft',
        grabId: 'grabLowerLegLeft',
        side: 'left',
        part: 'lowerLeg',
        radius: 0.1
      }
    ];

    anchors.forEach((item) => {
      const anchor = document.createElement('a-entity');

      anchor.setAttribute('id', item.anchorId);
      anchor.setAttribute(
        'bone-follow-anchor',
        `side: ${item.side}; part: ${item.part}; target: mid; offsetX: 0; offsetY: 0; offsetZ: 0`
      );

      const sphere = document.createElement('a-sphere');

      sphere.setAttribute('id', item.grabId);
      sphere.setAttribute('class', 'clickable');
      sphere.setAttribute('bone-grab-control', `side: ${item.side}; part: ${item.part}`);

      // Jarak pandang hanya dipasang ke sphere ini.
      // Jadi text dan object lain tidak ikut hilang.
      sphere.setAttribute('show-near-user', 'distance: 2.5');

      sphere.setAttribute('position', '0 0 0');
      sphere.setAttribute('radius', item.radius);

      // Warna dan transparansi versi sebelumnya.
      sphere.setAttribute(
        'material',
        'color: #00ffff; opacity: 0.25; transparent: true; depthTest: false'
      );

      // Paksa sphere tampil di depan object lain.
      sphere.addEventListener('loaded', () => {
        sphere.object3D.renderOrder = 999;

        if (sphere.object3D.children && sphere.object3D.children.length > 0) {
          sphere.object3D.children.forEach((child) => {
            child.renderOrder = 999;
          });
        }
      });

      anchor.appendChild(sphere);
      this.el.appendChild(anchor);
    });

    console.log('body-grab-anchors aktif.');
  }
});


// ==============================
// show-near-user
// Menampilkan HANYA a-sphere saat user berada dekat.
// Kalau component ini tidak sengaja dipasang ke text/entity lain,
// object tersebut tidak akan disembunyikan.
// ==============================

AFRAME.registerComponent('show-near-user', {
  schema: {
    distance: { type: 'number', default: 2.5 }
  },

  init: function () {
    this.rig = document.querySelector('#rig');

    this.userWorldPos = new THREE.Vector3();
    this.targetWorldPos = new THREE.Vector3();

    // Cek apakah component dipasang ke a-sphere.
    this.isSphere = this.el.tagName && this.el.tagName.toLowerCase() === 'a-sphere';

    // Kalau bukan sphere, jangan ubah visible.
    // Ini mencegah text/object lain ikut hilang.
    if (!this.isSphere) {
      console.warn('show-near-user hanya aktif untuk a-sphere:', this.el);
      return;
    }

    // Sphere awalnya disembunyikan.
    this.el.setAttribute('visible', false);
  },

  tick: function () {
    // Kalau bukan sphere, jangan lakukan apa-apa.
    if (!this.isSphere) return;

    if (!this.rig) {
      this.rig = document.querySelector('#rig');
      if (!this.rig) return;
    }

    this.rig.object3D.getWorldPosition(this.userWorldPos);
    this.el.object3D.getWorldPosition(this.targetWorldPos);

    const distanceToUser = this.userWorldPos.distanceTo(this.targetWorldPos);

    if (distanceToUser <= this.data.distance) {
      this.el.setAttribute('visible', true);
    } else {
      this.el.setAttribute('visible', false);
    }
  }
});