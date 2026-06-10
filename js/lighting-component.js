// ==============================
// lighting-component.js
// Membuat lampu ceiling dan point light ruangan.
// Supaya index.html tidak terlalu panjang.
// ==============================

AFRAME.registerComponent('room-lighting', {
  init: function () {
    const ceilingLightPositions = [
      '-2.5 2.75 -3.3',
      '2.5 2.75 -3.3',
      '-2.5 2.75 0',
      '2.5 2.75 -1.0', // Digeser agar tidak menabrak tembok pintu
      '-2.5 2.75 3.3',
      '3.3 2.75 2.5'   // Dipindah ke tepat di tengah atap Ruang Operator
    ];

    const pointLightPositions = [
      '-3.1 2.6 -3.3', '-2.5 2.6 -3.3', '-1.9 2.6 -3.3',
      '1.9 2.6 -3.3', '2.5 2.6 -3.3', '3.1 2.6 -3.3',

      '-3.1 2.6 0', '-2.5 2.6 0', '-1.9 2.6 0',
      '1.9 2.6 -1.0', '2.5 2.6 -1.0', '3.1 2.6 -1.0', // Titik cahaya digeser mengikuti lampu

      '-3.1 2.6 3.3', '-2.5 2.6 3.3', '-1.9 2.6 3.3',
      '2.7 2.6 2.5', '3.3 2.6 2.5', '3.9 2.6 2.5'     // Titik cahaya ruang operator
    ];

    ceilingLightPositions.forEach((position) => {
      const lightModel = document.createElement('a-gltf-model');
      lightModel.setAttribute('src', '#ceilingLight');
      lightModel.setAttribute('position', position);
      lightModel.setAttribute('rotation', '0 0 0');
      lightModel.setAttribute('scale', '1 1 1');

      this.el.appendChild(lightModel);
    });

    const ambientLight = document.createElement('a-light');
    ambientLight.setAttribute('type', 'ambient');
    ambientLight.setAttribute('intensity', '0.7');

    this.el.appendChild(ambientLight);

    pointLightPositions.forEach((position) => {
      const pointLight = document.createElement('a-light');
      pointLight.setAttribute('type', 'point');
      pointLight.setAttribute('position', position);
      pointLight.setAttribute('color', '#ffffff');
      pointLight.setAttribute('intensity', '0.15');
      pointLight.setAttribute('distance', '4');
      pointLight.setAttribute('decay', '2');

      this.el.appendChild(pointLight);
    });

    console.log('room-lighting aktif (posisi lampu disesuaikan dengan layout baru).');
  }
});