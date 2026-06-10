// ==============================
// movement-components.js
// Menahan user agar tidak menembus tembok dalam dan meja X-Ray.
// ==============================

AFRAME.registerComponent('limit-room', {
  init: function() {
    this.oldX = 0;
    this.oldZ = 0;
  },
  tick: function () {
    const pos = this.el.object3D.position;

    // Batas tembok terluar ruangan
    if (pos.x < -4.8) pos.x = -4.8;
    if (pos.x > 4.8) pos.x = 4.8;
    if (pos.z < -4.8) pos.z = -4.8;
    if (pos.z > 4.8) pos.z = 4.8;

    // Tembok Kaca Partisi (Membentang ke belakang)
    const nabrakKaca = pos.x > 1.55 && pos.x < 1.95 && pos.z > -0.2 && pos.z < 5.0;

    // Tembok Depan (Ruang Operator). Pintu terbuka di X = 1.8 sampai 2.8
    const nabrakTembokSampingPintu = pos.x > 2.8 && pos.x < 5.0 && pos.z > -0.2 && pos.z < 0.2;

    // Batas Meja X-Ray di tengah
    const nabrakMeja = pos.x > -1.2 && pos.x < 1.2 && pos.z > -1.5 && pos.z < 1.5;

    // Jika menabrak salah satu objek di atas, kembalikan ke posisi sebelumnya
    if (nabrakKaca || nabrakTembokSampingPintu || nabrakMeja) {
      pos.x = this.oldX;
      pos.z = this.oldZ;
    } else {
      // Jika jalur aman, simpan posisi saat ini
      this.oldX = pos.x;
      this.oldZ = pos.z;
    }
  }
});