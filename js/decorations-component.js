// ==============================
// decorations-component.js
// Mengatur semua dekorasi GLB di ruangan X-Ray.
// Tujuan: index.html tetap pendek walaupun dekorasi banyak.
// ==============================

AFRAME.registerComponent('xray-decorations', {
  init: function () {
    const decorations = [
      // ==============================
      // CONTOH DEKORASI
      // Ubah src sesuai id di <a-assets>.
      // ==============================

      {
        id: 'decoCabinet01',
        src: '#cabinetModel',
        position: '-3.8 0 -3.8',
        rotation: '0 90 0',
        scale: '1 1 1'
      },

      {
        id: 'decoMonitor01',
        src: '#monitorModel',
        position: '2.8 1.1 -3.9',
        rotation: '0 180 0',
        scale: '1 1 1'
      },

      {
        id: 'decoChair01',
        src: '#chairModel',
        position: '3.4 0 2.8',
        rotation: '0 -45 0',
        scale: '1 1 1'
      },

      {
        id: 'decoOxygenTank01',
        src: '#oxygenTankModel',
        position: '-3.7 0 2.8',
        rotation: '0 0 0',
        scale: '1 1 1'
      }

      // Tambahkan dekorasi baru di bawah ini.
      // Jangan lupa beri koma sebelum object baru.
    ];

    decorations.forEach((item) => {
      const model = document.createElement('a-gltf-model');

      model.setAttribute('id', item.id);
      model.setAttribute('src', item.src);
      model.setAttribute('position', item.position);
      model.setAttribute('rotation', item.rotation);
      model.setAttribute('scale', item.scale);

      // Optional: agar dekorasi bisa dicari/debug.
      model.setAttribute('class', 'decoration');

      this.el.appendChild(model);
    });

    console.log('xray-decorations aktif. Jumlah dekorasi:', decorations.length);
  }
});