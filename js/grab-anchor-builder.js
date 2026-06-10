// ==============================
// grab-anchor-builder.js
// Membuat semua sphere grab tangan dan kaki secara otomatis.
// Supaya index.html tidak penuh dengan anchor/sphere berulang.
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
      sphere.setAttribute('position', '0 0 0');
      sphere.setAttribute('radius', item.radius);
      sphere.setAttribute('material', 'color: #00ffff; opacity: 0.25; transparent: true');

      anchor.appendChild(sphere);
      this.el.appendChild(anchor);
    });

    console.log('body-grab-anchors aktif.');
  }
});