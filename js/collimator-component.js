// ==============================
// collimator-component.js
// Mengatur pelebaran dan penyempitan cahaya kolimasi X-Ray
// Sekarang sudah punya fungsi resetKolimasi()
// ==============================

AFRAME.registerComponent('kontrol-kolimasi', {
  init: function () {
    // Nilai ukuran awal dan batasan
    this.initialLebar = 0.8;
    this.initialPanjang = 0.8;

    this.lebar = this.initialLebar;        // Ukuran X awal
    this.panjang = this.initialPanjang;    // Ukuran Y awal

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

    // Terapkan ukuran awal saat pertama kali scene jalan
    this.applyKolimasiSize();

    // Fungsi bantu untuk memberi efek kedip saat tombol diklik
    const efekKlik = (tombol) => {
      if (!tombol) return;

      const warnaAsli = tombol.getAttribute('color');
      tombol.setAttribute('color', '#ffffff');

      setTimeout(() => {
        tombol.setAttribute('color', warnaAsli);
      }, 150);
    };

    // Pasang Event Listener ke masing-masing tombol
    if (btnLMin) {
      btnLMin.addEventListener('click', () => {
        efekKlik(btnLMin);
        this.ubahUkuran('lebar', -1);
      });
    }

    if (btnLPlus) {
      btnLPlus.addEventListener('click', () => {
        efekKlik(btnLPlus);
        this.ubahUkuran('lebar', 1);
      });
    }

    if (btnPMin) {
      btnPMin.addEventListener('click', () => {
        efekKlik(btnPMin);
        this.ubahUkuran('panjang', -1);
      });
    }

    if (btnPPlus) {
      btnPPlus.addEventListener('click', () => {
        efekKlik(btnPPlus);
        this.ubahUkuran('panjang', 1);
      });
    }

    console.log('kontrol-kolimasi aktif.');
  },

  ubahUkuran: function (dimensi, arah) {
    if (!this.cahaya) {
      console.log('collimatorLightField tidak ditemukan.');
      return;
    }

    if (dimensi === 'lebar') {
      this.lebar += arah * this.step;

      if (this.lebar < this.batasMin) {
        this.lebar = this.batasMin;
      }

      if (this.lebar > this.batasMax) {
        this.lebar = this.batasMax;
      }
    }

    if (dimensi === 'panjang') {
      this.panjang += arah * this.step;

      if (this.panjang < this.batasMin) {
        this.panjang = this.batasMin;
      }

      if (this.panjang > this.batasMax) {
        this.panjang = this.batasMax;
      }
    }

    this.applyKolimasiSize();

    console.log('Ukuran kolimasi:', {
      lebar: this.lebar,
      panjang: this.panjang
    });
  },

  applyKolimasiSize: function () {
    // Cahaya kuning kolimator
    if (this.cahaya) {
      this.cahaya.setAttribute('width', this.lebar);
      this.cahaya.setAttribute('height', this.panjang);
    }

    // Garis horizontal ikut lebar
    if (this.garisX) {
      this.garisX.setAttribute('width', this.lebar);
    }

    // Garis vertikal ikut panjang
    if (this.garisY) {
      this.garisY.setAttribute('height', this.panjang);
    }
  },

  resetKolimasi: function () {
    this.lebar = this.initialLebar;
    this.panjang = this.initialPanjang;

    this.applyKolimasiSize();

    console.log('Kolimasi di-reset ke ukuran awal.');
  }
});