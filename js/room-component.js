// ==============================
// room-component.js
// Membuat lantai, dinding, atap, dan RUANG OPERATOR (partisi dalam).
// ==============================

AFRAME.registerComponent('room-builder', {
  init: function () {
    this.el.innerHTML = `
      <!-- ===== RUANG UTAMA X-RAY ===== -->

      <!-- Lantai utama -->
      <a-box
        position="0 0 0"
        width="10"
        height="0.1"
        depth="10"
        color="#888888">
      </a-box>

      <!-- Dinding belakang -->
      <a-box
        position="0 1.5 -5"
        width="10"
        height="3"
        depth="0.1"
        color="#dddddd">
      </a-box>

      <!-- Dinding depan -->
      <a-box
        position="0 1.5 5"
        width="10"
        height="3"
        depth="0.1"
        color="#dddddd">
      </a-box>

      <!-- Dinding kiri -->
      <a-box
        position="-5 1.5 0"
        width="0.1"
        height="3"
        depth="10"
        color="#cccccc">
      </a-box>

      <!-- Dinding kanan -->
      <a-box
        position="5 1.5 0"
        width="0.1"
        height="3"
        depth="10"
        color="#cccccc">
      </a-box>

      <!-- Atap -->
      <a-box
        position="0 3 0"
        width="10"
        height="0.1"
        depth="10"
        color="#eeeeee">
      </a-box>

      <!-- ===== RUANG OPERATOR (booth kecil di pojok kanan depan) ===== -->
      <!-- Ukuran booth: 3m x 2.5m, di posisi kanan-depan ruangan -->

      <!-- Dinding partisi kiri booth (memisahkan dari ruang X-Ray utama) -->
      <a-box
        position="1.75 1.5 2.5"
        width="0.1"
        height="3"
        depth="5"
        color="#cccccc">
      </a-box>

      <!-- Dinding partisi depan booth (kaca timbal / lead glass panel) -->
      <!-- Bagian bawah: dinding solid -->
      <a-box
        position="3.375 0.5 5"
        width="3.25"
        height="1"
        depth="0.12"
        color="#bbbbbb">
      </a-box>

      <!-- Bagian atas: kaca timbal (transparan) -->
      <a-box
        position="3.375 1.75 5"
        width="3.25"
        height="1.5"
        depth="0.08"
        color="#99ccee"
        opacity="0.35"
        transparent="true">
      </a-box>

      <!-- Frame kaca timbal atas -->
      <a-box
        position="3.375 2.52 5"
        width="3.26"
        height="0.08"
        depth="0.13"
        color="#777777">
      </a-box>
      <a-box
        position="3.375 1.0 5"
        width="3.26"
        height="0.08"
        depth="0.13"
        color="#777777">
      </a-box>

      <!-- Pintu masuk booth (bukaan di dinding partisi kiri, tidak ada fisik = gap) -->
      <!-- Bingkai atas pintu -->
      <a-box
        position="1.75 2.7 3.75"
        width="0.12"
        height="0.25"
        depth="1.0"
        color="#aaaaaa">
      </a-box>

      <!-- Lantai booth (sedikit berbeda warna) -->
      <a-box
        position="3.375 0.06 2.5"
        width="3.25"
        height="0.02"
        depth="5"
        color="#9a9a9a">
      </a-box>

      <!-- Label ruang operator di atas kaca -->
      <a-text
        value="RUANG OPERATOR"
        position="3.375 2.85 4.94"
        color="#003366"
        align="center"
        scale="0.25 0.25 0.25">
      </a-text>

      <!-- Atap --> 
    `;

    console.log('room-builder aktif (dengan ruang operator).');
  }
});
