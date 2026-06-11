// ==============================
// collimator-component.js
// Mengatur pelebaran dan penyempitan cahaya kolimasi X-Ray
// ==============================

AFRAME.registerComponent('kontrol-kolimasi', {
  init: function () {
    // Nilai ukuran awal dan batasan
    this.lebar = 0.8;      // Ukuran X awal
    this.panjang = 0.8;    // Ukuran Y awal
    this.batasMin = 0.2;   // Paling kecil 20cm
    this.batasMax = 1.4;   // Paling besar 140cm
    this.step = 0.1;       // Perubahan setiap 1x klik

    // Ambil elemen visual cahaya
    this.cahaya = document.querySelector('#collimatorLightField');
    this.garisX = document.querySelector('#crosshairX');
    this.garisY = document.querySelector('#crosshairY');

    // Ambil elemen tombol
    const btnLMin = document.querySelector('#btnLebarMin');
    const btnLPlus = document.querySelector('#btnLebarPlus');
    const btnPMin = document.querySelector('#btnPanjangMin');
    const btnPPlus = document.querySelector('#btnPanjangPlus');

    // Fungsi bantu untuk memberi efek kedip saat tombol diklik
    const efekKlik = (tombol) => {
      const warnaAsli = tombol.getAttribute('color');
      tombol.setAttribute('color', '#ffffff'); // Berubah putih sejenak
      setTimeout(() => tombol.setAttribute('color', warnaAsli), 150);
    };

    // Pasang Event Listener ke masing-masing tombol
    if (btnLMin) btnLMin.addEventListener('click', () => { efekKlik(btnLMin); this.ubahUkuran('lebar', -1); });
    if (btnLPlus) btnLPlus.addEventListener('click', () => { efekKlik(btnLPlus); this.ubahUkuran('lebar', 1); });
    if (btnPMin) btnPMin.addEventListener('click', () => { efekKlik(btnPMin); this.ubahUkuran('panjang', -1); });
    if (btnPPlus) btnPPlus.addEventListener('click', () => { efekKlik(btnPPlus); this.ubahUkuran('panjang', 1); });
    
    console.log('kontrol-kolimasi aktif.');
  },

  ubahUkuran: function (dimensi, arah) {
    if (!this.cahaya) return;

    if (dimensi === 'lebar') {
      this.lebar += arah * this.step;
      
      // Batasi agar tidak terlalu kecil atau terlalu besar
      if (this.lebar < this.batasMin) this.lebar = this.batasMin;
      if (this.lebar > this.batasMax) this.lebar = this.batasMax;
      
      // Terapkan perubahan ke visual
      this.cahaya.setAttribute('width', this.lebar);
      this.garisX.setAttribute('width', this.lebar); // Garis horizontal ikut memanjang
    } 
    else if (dimensi === 'panjang') {
      this.panjang += arah * this.step;
      
      // Batasi agar tidak terlalu kecil atau terlalu besar
      if (this.panjang < this.batasMin) this.panjang = this.batasMin;
      if (this.panjang > this.batasMax) this.panjang = this.batasMax;
      
      // Terapkan perubahan ke visual
      this.cahaya.setAttribute('height', this.panjang);
      this.garisY.setAttribute('height', this.panjang); // Garis vertikal ikut memanjang
    }
  }
});