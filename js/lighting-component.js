// ==============================
// lighting-component.js
// Membuat lampu ceiling dan point light ruangan (Versi Lebih Terang).
// ==============================

AFRAME.registerComponent('room-lighting', {
  init: function () {
    const ceilingLightPositions = [
      '-2.5 2.75 -3.3',
      '2.5 2.75 -3.3',
      '-2.5 2.75 0',
      '2.5 2.75 -1.0', // Posisi dekat tembok pintu operator
      '-2.5 2.75 3.3',
      '3.3 2.75 2.5'   // Tepat di tengah atap Ruang Operator
    ];

    const pointLightPositions = [
      '-3.1 2.6 -3.3', '-2.5 2.6 -3.3', '-1.9 2.6 -3.3',
      '1.9 2.6 -3.3', '2.5 2.6 -3.3', '3.1 2.6 -3.3',

      '-3.1 2.6 0', '-2.5 2.6 0', '-1.9 2.6 0',
      '1.9 2.6 -1.0', '2.5 2.6 -1.0', '3.1 2.6 -1.0',

      '-3.1 2.6 3.3', '-2.5 2.6 3.3', '-1.9 2.6 3.3',
      '2.7 2.6 2.5', '3.3 2.6 2.5', '3.9 2.6 2.5'
    ];

    ceilingLightPositions.forEach((position) => {
      const lightModel = document.createElement('a-gltf-model');
      lightModel.setAttribute('src', '#ceilingLight');
      lightModel.setAttribute('position', position);
      lightModel.setAttribute('rotation', '0 0 0');
      lightModel.setAttribute('scale', '1 1 1');

      this.el.appendChild(lightModel);
    });

    // 1. LAMPU SEKITAR (Ambient Light) - Menaikkan kecerahan dasar ruangan keseluruhan
    // Diubah dari 0.7 menjadi 1.3 agar area bayangan tidak terlalu gelap
    const ambientLight = document.createElement('a-light');
    ambientLight.setAttribute('type', 'ambient');
    ambientLight.setAttribute('intensity', '1.3');

    this.el.appendChild(ambientLight);

    // 2. LAMPU TITIK SOROT (Point Light) - Cahaya dari masing-masing lampu plafon
    // Diubah intensitasnya dari 0.15 menjadi 0.45 agar sorotan ke lantai dan objek lebih kuat
    pointLightPositions.forEach((position) => {
      const pointLight = document.createElement('a-light');
      pointLight.setAttribute('type', 'point');
      pointLight.setAttribute('position', position);
      pointLight.setAttribute('color', '#ffffff');
      pointLight.setAttribute('intensity', '0.45');
      pointLight.setAttribute('distance', '6'); // Jangkauan cahaya diperluas dari 4 ke 6
      pointLight.setAttribute('decay', '1.5');   // Efek redaman cahaya diperhalus

      this.el.appendChild(pointLight);
    });

    console.log('room-lighting aktif (Pencahayaan ruangan ditingkatkan menjadi terang).');
  }
});