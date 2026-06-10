// ==============================
// xray-monitor-component.js
// Monitor X-Ray + panel kontrol + fitur Lihat & Cetak
// ==============================

AFRAME.registerComponent('xray-monitor', {
  init: function () {
    const el = this.el;

    // ---- MEJA MONITOR ----
    const desk = document.createElement('a-box');
    desk.setAttribute('position', '0 0 0');
    desk.setAttribute('width', '1.6'); desk.setAttribute('height', '0.05'); desk.setAttribute('depth', '0.7');
    desk.setAttribute('color', '#555555');
    el.appendChild(desk);

    const legL = document.createElement('a-box');
    legL.setAttribute('position', '-0.7 -0.35 0');
    legL.setAttribute('width', '0.06'); legL.setAttribute('height', '0.7'); legL.setAttribute('depth', '0.06');
    legL.setAttribute('color', '#444444');
    el.appendChild(legL);

    const legR = document.createElement('a-box');
    legR.setAttribute('position', '0.7 -0.35 0');
    legR.setAttribute('width', '0.06'); legR.setAttribute('height', '0.7'); legR.setAttribute('depth', '0.06');
    legR.setAttribute('color', '#444444');
    el.appendChild(legR);

    // ---- MONITOR UTAMA ----
    const monBase = document.createElement('a-box');
    monBase.setAttribute('position', '0 0.35 -0.1');
    monBase.setAttribute('width', '0.1'); monBase.setAttribute('height', '0.35'); monBase.setAttribute('depth', '0.1');
    monBase.setAttribute('color', '#333333');
    el.appendChild(monBase);

    const monScreen = document.createElement('a-box');
    monScreen.setAttribute('position', '0 0.75 -0.1');
    monScreen.setAttribute('width', '1.4'); monScreen.setAttribute('height', '0.85'); monScreen.setAttribute('depth', '0.06');
    monScreen.setAttribute('color', '#111111');
    el.appendChild(monScreen);

    // Layar (Tempat Gambar X-Ray Muncul)
    const screenDisplay = document.createElement('a-plane');
    screenDisplay.setAttribute('id', 'xrayScreenDisplay');
    screenDisplay.setAttribute('position', '0 0.75 -0.068');
    screenDisplay.setAttribute('width', '1.3'); screenDisplay.setAttribute('height', '0.75');
    screenDisplay.setAttribute('color', '#0a0a0a');
    el.appendChild(screenDisplay);

    const screenText = document.createElement('a-text');
    screenText.setAttribute('id', 'xrayStatusText');
    screenText.setAttribute('value', 'SIAP\nMENGAMBIL CITRA');
    screenText.setAttribute('position', '0 0.75 -0.065');
    screenText.setAttribute('color', '#00ff88');
    screenText.setAttribute('align', 'center');
    screenText.setAttribute('scale', '0.28 0.28 0.28');
    el.appendChild(screenText);

    // ---- MONITOR KECIL (Vital Sign) ----
    const smBase = document.createElement('a-box');
    smBase.setAttribute('position', '-1.6 0.35 -0.1');
    smBase.setAttribute('width', '0.06'); smBase.setAttribute('height', '0.25'); smBase.setAttribute('depth', '0.06');
    smBase.setAttribute('color', '#333333');
    el.appendChild(smBase);

    const smScreen = document.createElement('a-box');
    smScreen.setAttribute('position', '-1.6 0.65 -0.1');
    smScreen.setAttribute('width', '0.6'); smScreen.setAttribute('height', '0.45'); smScreen.setAttribute('depth', '0.06');
    smScreen.setAttribute('color', '#1a1a1a');
    el.appendChild(smScreen);

    const ekgText = document.createElement('a-text');
    ekgText.setAttribute('value', '♥ 72 BPM\nSPO2: 98%\nBP: 120/80');
    ekgText.setAttribute('position', '-1.6 0.65 -0.072');
    ekgText.setAttribute('color', '#00ff44');
    ekgText.setAttribute('align', 'center');
    ekgText.setAttribute('scale', '0.12 0.12 0.12');
    el.appendChild(ekgText);

    // ---- MESIN PRINTER (Kanan Meja) ----
    const printerBox = document.createElement('a-box');
    printerBox.setAttribute('position', '1.2 0.15 0');
    printerBox.setAttribute('width', '0.45'); printerBox.setAttribute('height', '0.25'); printerBox.setAttribute('depth', '0.6');
    printerBox.setAttribute('color', '#cccccc');
    el.appendChild(printerBox);
    
    // Celah keluar kertas printer
    const printSlot = document.createElement('a-box');
    printSlot.setAttribute('position', '1.2 0.22 0.3');
    printSlot.setAttribute('width', '0.35'); printSlot.setAttribute('height', '0.02'); printSlot.setAttribute('depth', '0.05');
    printSlot.setAttribute('color', '#111111');
    el.appendChild(printSlot);

    // Kertas Hasil Cetak (Disembunyikan di dalam celah awalnya)
    const printOut = document.createElement('a-plane');
    printOut.setAttribute('id', 'xrayPrintOut');
    printOut.setAttribute('position', '1.2 0.22 0.3'); // Posisi awal dalam celah
    printOut.setAttribute('rotation', '-90 180 0'); // Menghadap ke atas
    printOut.setAttribute('width', '0.25');
    printOut.setAttribute('height', '0.35');
    printOut.setAttribute('material', 'src: #hasilXray'); // Menggunakan gambar dari assets
    printOut.setAttribute('visible', 'false'); // Sembunyikan dulu
    // Animasi geser keluar
    printOut.setAttribute('animation__keluar', 'property: position; from: 1.2 0.22 0.3; to: 1.2 0.22 0.55; dur: 2500; startEvents: do-print');
    el.appendChild(printOut);


    // ---- KEYBOARD & MOUSE ----
    const keyboard = document.createElement('a-box');
    keyboard.setAttribute('position', '0 0.035 0.15');
    keyboard.setAttribute('width', '0.9'); keyboard.setAttribute('height', '0.02'); keyboard.setAttribute('depth', '0.28');
    keyboard.setAttribute('color', '#222222');
    el.appendChild(keyboard);

    const mouse = document.createElement('a-box');
    mouse.setAttribute('position', '0.55 0.035 0.18');
    mouse.setAttribute('width', '0.1'); mouse.setAttribute('height', '0.022'); mouse.setAttribute('depth', '0.14');
    mouse.setAttribute('color', '#2a2a2a');
    el.appendChild(mouse);


    // ========================================================
    // TOMBOL FUNGSIONAL (DITATA ULANG JADI 6 TOMBOL)
    // ========================================================
    
    // Baris Atas
    this._createButton(el, { groupPos: '-0.35 1.57 -0.07', w: 0.5, h: 0.1, d: 0.07, color: '#885500', hoverColor: '#bb7700', btnLabel: 'DATA PASIEN', descLabel: '[ Isi formulir ]', id: 'btnDataPasien', action: 'openPatientForm' });
    this._createButton(el, { groupPos: '0.35 1.57 -0.07', w: 0.5, h: 0.1, d: 0.07, color: '#991100', hoverColor: '#cc2200', btnLabel: 'HAPUS CITRA', descLabel: '[ Reset layar ]', id: 'btnHapus', action: 'hapusData' });

    // Baris Bawah (4 Tombol sejajar)
    this._createButton(el, { groupPos: '-0.57 1.43 -0.07', w: 0.35, h: 0.1, d: 0.07, color: '#005fcc', hoverColor: '#0088ff', btnLabel: 'AMBIL', descLabel: '[ Scan ]', id: 'btnAmbilCitra', action: 'ambilCitra' });
    this._createButton(el, { groupPos: '-0.19 1.43 -0.07', w: 0.35, h: 0.1, d: 0.07, color: '#006633', hoverColor: '#00aa55', btnLabel: 'SIMPAN', descLabel: '[ Save ]', id: 'btnSimpan', action: 'simpanData' });
    this._createButton(el, { groupPos: '0.19 1.43 -0.07', w: 0.35, h: 0.1, d: 0.07, color: '#6600cc', hoverColor: '#9933ff', btnLabel: 'LIHAT', descLabel: '[ Tampilkan ]', id: 'btnLihat', action: 'lihatData' });
    this._createButton(el, { groupPos: '0.57 1.43 -0.07', w: 0.35, h: 0.1, d: 0.07, color: '#228888', hoverColor: '#33bbbb', btnLabel: 'CETAK', descLabel: '[ Print Kertas ]', id: 'btnCetak', action: 'cetakData' });

    // Event listeners Custom
    document.addEventListener('xray-action', (e) => {
      const action = e.detail.action;
      if      (action === 'ambilCitra')      this._ambilCitra();
      else if (action === 'simpanData')      this._simpanData();
      else if (action === 'lihatData')       this._lihatData();
      else if (action === 'cetakData')       this._cetakData();
      else if (action === 'hapusData')       this._hapusData();
      else if (action === 'openPatientForm') this._openPatientForm();
    });

    this._scanCount = 0;
    this._isDataSaved = false; // Status untuk mencegah cetak sebelum disimpan
    console.log('xray-monitor aktif (dengan Printer).');
  },

  _createButton: function (parent, cfg) {
    const group = document.createElement('a-entity');
    group.setAttribute('position', cfg.groupPos);

    const box = document.createElement('a-box');
    box.setAttribute('class', 'clickable');
    box.setAttribute('width', cfg.w); box.setAttribute('height', cfg.h); box.setAttribute('depth', cfg.d);
    box.setAttribute('color', cfg.color);

    box.addEventListener('click', () => { document.dispatchEvent(new CustomEvent('xray-action', { detail: { action: cfg.action } })); });
    box.addEventListener('mouseenter', () => { box.setAttribute('color', cfg.hoverColor); });
    box.addEventListener('mouseleave', () => { box.setAttribute('color', cfg.color); });

    const btnText = document.createElement('a-text');
    btnText.setAttribute('value', cfg.btnLabel);
    btnText.setAttribute('position', `0 0 ${cfg.d / 2 + 0.005}`);
    btnText.setAttribute('color', '#ffffff'); btnText.setAttribute('align', 'center'); btnText.setAttribute('scale', '0.18 0.18 0.18');
    btnText.setAttribute('font', 'monoid');

    const desc = document.createElement('a-text');
    desc.setAttribute('value', cfg.descLabel);
    desc.setAttribute('position', `0 ${cfg.h / 2 + 0.04} 0`);
    desc.setAttribute('color', '#888888'); desc.setAttribute('align', 'center'); desc.setAttribute('scale', '0.1 0.1 0.1');

    group.appendChild(box); group.appendChild(btnText); group.appendChild(desc);
    parent.appendChild(group);
  },

  _ambilCitra: function () {
    this._scanCount++;
    this._isDataSaved = false; // Reset status simpan
    
    // Matikan gambar di layar jika ada
    const screenEl = document.querySelector('#xrayScreenDisplay');
    if (screenEl) {
      screenEl.removeAttribute('material');
      screenEl.setAttribute('color', '#0a0800');
    }

    const statusEl = document.querySelector('#xrayStatusText');
    if (!statusEl) return;

    statusEl.setAttribute('value', '▶ MEMINDAI...\nMOHON TIDAK BERGERAK');
    statusEl.setAttribute('color', '#ffaa00');

    // === EFEK SINAR X-RAY ===
    const xrayBeam = document.querySelector('#xrayBeam');
    const xraySpotlight = document.querySelector('#xraySpotlight');
    if (xrayBeam) xrayBeam.emit('start-xray');
    if (xraySpotlight) xraySpotlight.emit('start-xray');

    setTimeout(() => {
      statusEl.setAttribute('value', `✓ CITRA #${this._scanCount} SELESAI\n\nSilakan Klik SIMPAN`);
      statusEl.setAttribute('color', '#00ff88');

      if (xrayBeam) xrayBeam.emit('stop-xray');
      if (xraySpotlight) xraySpotlight.emit('stop-xray');
    }, 2200);
  },

  _simpanData: function () {
    const statusEl = document.querySelector('#xrayStatusText');
    if (!statusEl) return;
    statusEl.setAttribute('value', '💾 MENYIMPAN DATA...\nSilakan tunggu');
    statusEl.setAttribute('color', '#44ff88');
    setTimeout(() => {
      this._isDataSaved = true;
      statusEl.setAttribute('value', '✓ TERSIMPAN\n\nSiap Dilihat / Dicetak');
      statusEl.setAttribute('color', '#00ff88');
    }, 1200);
  },

  _lihatData: function () {
    if (!this._isDataSaved) return; // Hanya bisa lihat jika sudah disimpan
    
    const screenEl = document.querySelector('#xrayScreenDisplay');
    const statusEl = document.querySelector('#xrayStatusText');
    if (screenEl) {
      // Munculkan tekstur gambar ke layar
      screenEl.setAttribute('material', 'src: #hasilXray');
      screenEl.setAttribute('color', '#ffffff');
    }
    if (statusEl) statusEl.setAttribute('value', ''); // Sembunyikan teks agar tidak nutupin gambar
  },

  _cetakData: function () {
    if (!this._isDataSaved) return;
    
    const printOut = document.querySelector('#xrayPrintOut');
    const statusEl = document.querySelector('#xrayStatusText');
    
    if (statusEl && !document.querySelector('#xrayScreenDisplay').getAttribute('material')) {
        statusEl.setAttribute('value', '🖨 MENCETAK FILM...');
    }

    if (printOut) {
      // Reset posisi kertas ke dalam mesin, lalu munculkan dan jalankan animasi
      printOut.setAttribute('position', '1.2 0.22 0.3');
      printOut.setAttribute('visible', 'true');
      printOut.emit('do-print'); // Triger animasi keluar
    }
  },

  _hapusData: function () {
    this._isDataSaved = false;
    const statusEl = document.querySelector('#xrayStatusText');
    const screenEl = document.querySelector('#xrayScreenDisplay');
    const printOut = document.querySelector('#xrayPrintOut');

    if (statusEl) {
      statusEl.setAttribute('value', '🗑 CITRA DIHAPUS\nSIAP SCAN BARU');
      statusEl.setAttribute('color', '#ff4444');
    }
    if (screenEl) {
      screenEl.removeAttribute('material');
      screenEl.setAttribute('color', '#0a0a0a');
    }
    if (printOut) {
      printOut.setAttribute('visible', 'false'); // Sembunyikan kembali kertas print
    }

    setTimeout(() => {
      if (statusEl) {
        statusEl.setAttribute('value', 'SIAP\nMENGAMBIL CITRA');
        statusEl.setAttribute('color', '#00ff88');
      }
    }, 1600);
  },

  _openPatientForm: function () {
    const overlay = document.getElementById('patientFormOverlay');
    if (overlay) overlay.style.display = 'flex';
  }
});