// ==============================
// grab-anchor-builder.js
// Membuat semua sphere grab tangan dan kaki secara otomatis.
// Sphere hanya terlihat kalau user berada dalam jarak 1.5 meter.
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

      // Tambahan:
      // Sphere hanya terlihat pada jarak maksimal 1.5 meter dari user/camera rig.
      sphere.setAttribute('show-near-user', 'distance: 2.5');

      sphere.setAttribute('position', '0 0 0');
      sphere.setAttribute('radius', item.radius);

      sphere.setAttribute(
        'material',
        'color: #00ffff; opacity: 0.25; transparent: true; depthTest: false'
      );

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
// Menampilkan sphere hanya saat user berada dekat.
// ==============================

AFRAME.registerComponent('show-near-user', {
  schema: {
    distance: { type: 'number', default: 1.5 }
  },

  init: function () {
    this.rig = document.querySelector('#rig');

    this.userWorldPos = new THREE.Vector3();
    this.sphereWorldPos = new THREE.Vector3();

    // Awalnya disembunyikan.
    this.el.setAttribute('visible', false);
  },

  tick: function () {
    if (!this.rig) {
      this.rig = document.querySelector('#rig');
      if (!this.rig) return;
    }

    this.rig.object3D.getWorldPosition(this.userWorldPos);
    this.el.object3D.getWorldPosition(this.sphereWorldPos);

    const distanceToUser = this.userWorldPos.distanceTo(this.sphereWorldPos);

    if (distanceToUser <= this.data.distance) {
      this.el.setAttribute('visible', true);
    } else {
      this.el.setAttribute('visible', false);
    }
  }
});