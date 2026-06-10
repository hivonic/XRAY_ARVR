// ==============================
// xray-monitor-component.js
// Monitor X-Ray + panel kontrol + tombol berlabel jelas
// ==============================

AFRAME.registerComponent('xray-monitor', {
  init: function () {
    const el = this.el;

    // ---- MEJA MONITOR ----
    const desk = document.createElement('a-box');
    desk.setAttribute('position', '0 0 0');
    desk.setAttribute('width', '1.6');
    desk.setAttribute('height', '0.05');
    desk.setAttribute('depth', '0.7');
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

    const screenDisplay = document.createElement('a-plane');
    screenDisplay.setAttribute('id', 'xrayScreenDisplay');
    screenDisplay.setAttribute('position', '0 0.75 -0.07');
    screenDisplay.setAttribute('width', '1.3');
    screenDisplay.setAttribute('height', '0.75');
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

    const border = document.createElement('a-plane');
    border.setAttribute('position', '0 0.75 -0.073');
    border.setAttribute('width', '1.34'); border.setAttribute('height', '0.79');
    border.setAttribute('color', '#00aaff'); border.setAttribute('opacity', '0.15');
    el.appendChild(border);

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

    const smLabel = document.createElement('a-text');
    smLabel.setAttribute('value', 'VITAL SIGN');
    smLabel.setAttribute('position', '-1.6 0.91 -0.072');
    smLabel.setAttribute('color', '#aaddff');
    smLabel.setAttribute('align', 'center');
    smLabel.setAttribute('scale', '0.09 0.09 0.09');
    el.appendChild(smLabel);

    // ---- KEYBOARD ----
    const keyboard = document.createElement('a-box');
    keyboard.setAttribute('position', '0 0.035 0.15');
    keyboard.setAttribute('width', '0.9'); keyboard.setAttribute('height', '0.02'); keyboard.setAttribute('depth', '0.28');
    keyboard.setAttribute('color', '#222222');
    el.appendChild(keyboard);

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 10; col++) {
        const key = document.createElement('a-box');
        key.setAttribute('position', `${-0.4 + col * 0.088} 0.046 ${0.06 + row * 0.065}`);
        key.setAttribute('width', '0.075'); key.setAttribute('height', '0.01'); key.setAttribute('depth', '0.055');
        key.setAttribute('color', '#3a3a3a');
        el.appendChild(key);
      }
    }

    // ---- MOUSE ----
    const mouse = document.createElement('a-box');
    mouse.setAttribute('position', '0.55 0.035 0.18');
    mouse.setAttribute('width', '0.1'); mouse.setAttribute('height', '0.022'); mouse.setAttribute('depth', '0.14');
    mouse.setAttribute('color', '#2a2a2a');
    el.appendChild(mouse);

    // ---- PANEL KONTROL (kotak fisik di samping) ----
    const panel = document.createElement('a-box');
    panel.setAttribute('position', '1.1 0.12 -0.1');
    panel.setAttribute('width', '0.5'); panel.setAttribute('height', '0.2'); panel.setAttribute('depth', '0.35');
    panel.setAttribute('color', '#2a2a2a');
    el.appendChild(panel);

    // Label panel
    const panelLabel = document.createElement('a-text');
    panelLabel.setAttribute('value', 'STATUS SISTEM');
    panelLabel.setAttribute('position', '1.1 0.245 -0.08');
    panelLabel.setAttribute('color', '#aaaacc');
    panelLabel.setAttribute('align', 'center');
    panelLabel.setAttribute('scale', '0.07 0.07 0.07');
    el.appendChild(panelLabel);

    // ---- 3 LAMPU INDIKATOR STATUS (kecil, di atas panel, bukan tombol) ----
    const indicators = [
      { pos: '0.95 0.235 -0.28', color: '#00ff44', id: 'indPower',  labelVal: 'POWER' },
      { pos: '1.07 0.235 -0.28', color: '#ffaa00', id: 'indStandby', labelVal: 'STANDBY' },
      { pos: '1.19 0.235 -0.28', color: '#ff3333', id: 'indAlert',   labelVal: 'ALERT' }
    ];

    indicators.forEach((ind) => {
      // Bola lampu kecil
      const sphere = document.createElement('a-sphere');
      sphere.setAttribute('id', ind.id);
      sphere.setAttribute('position', ind.pos);
      sphere.setAttribute('radius', '0.022');
      sphere.setAttribute('color', ind.color);
      el.appendChild(sphere);

      // Label kecil di bawah bola
      const posArr = ind.pos.split(' ').map(Number);
      const indText = document.createElement('a-text');
      indText.setAttribute('value', ind.labelVal);
      indText.setAttribute('position', `${posArr[0]} ${posArr[1] - 0.038} ${posArr[2]}`);
      indText.setAttribute('color', '#888888');
      indText.setAttribute('align', 'center');
      indText.setAttribute('scale', '0.05 0.05 0.05');
      el.appendChild(indText);
    });

    // ========================================================
    // TOMBOL FUNGSIONAL — dengan label BESAR di atas tombol
    // ========================================================

    // TOMBOL 1: AMBIL CITRA (biru)
    this._createButton(el, {
      groupPos: '0 1.43 -0.07',
      w: 0.52, h: 0.1, d: 0.07,
      color: '#005fcc', hoverColor: '#0088ff',
      btnLabel: 'AMBIL CITRA',
      descLabel: '[ Mulai scan X-Ray ]',
      id: 'btnAmbilCitra',
      action: 'ambilCitra'
    });

    // TOMBOL 2: SIMPAN (hijau)
    this._createButton(el, {
      groupPos: '0.62 1.43 -0.07',
      w: 0.42, h: 0.1, d: 0.07,
      color: '#006633', hoverColor: '#00aa55',
      btnLabel: 'SIMPAN',
      descLabel: '[ Simpan hasil citra ]',
      id: 'btnSimpan',
      action: 'simpanData'
    });

    // TOMBOL 3: HAPUS (merah)
    this._createButton(el, {
      groupPos: '-0.62 1.43 -0.07',
      w: 0.42, h: 0.1, d: 0.07,
      color: '#991100', hoverColor: '#cc2200',
      btnLabel: 'HAPUS CITRA',
      descLabel: '[ Hapus & reset layar ]',
      id: 'btnHapus',
      action: 'hapusData'
    });

    // TOMBOL 4: DATA PASIEN (oranye)
    this._createButton(el, {
      groupPos: '0 1.57 -0.07',
      w: 0.62, h: 0.1, d: 0.07,
      color: '#885500', hoverColor: '#bb7700',
      btnLabel: 'INPUT DATA PASIEN',
      descLabel: '[ Isi formulir identitas pasien ]',
      id: 'btnDataPasien',
      action: 'openPatientForm'
    });

    // Event listeners
    document.addEventListener('xray-action', (e) => {
      const action = e.detail.action;
      if      (action === 'ambilCitra')      this._ambilCitra();
      else if (action === 'simpanData')      this._simpanData();
      else if (action === 'hapusData')       this._hapusData();
      else if (action === 'openPatientForm') this._openPatientForm();
    });

    this._scanCount = 0;
    console.log('xray-monitor aktif.');
  },

  // Buat tombol persegi panjang dengan label di atas tombol
  _createButton: function (parent, cfg) {
    const group = document.createElement('a-entity');
    group.setAttribute('position', cfg.groupPos);

    // Tombol utama
    const box = document.createElement('a-box');
    box.setAttribute('id', cfg.id);
    box.setAttribute('class', 'clickable');
    box.setAttribute('position', '0 0 0');
    box.setAttribute('width', cfg.w);
    box.setAttribute('height', cfg.h);
    box.setAttribute('depth', cfg.d);
    box.setAttribute('color', cfg.color);

    box.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('xray-action', { detail: { action: cfg.action } }));
    });
    box.addEventListener('mouseenter', () => {
      box.setAttribute('color', cfg.hoverColor);
      desc.setAttribute('color', '#ffffff');
    });
    box.addEventListener('mouseleave', () => {
      box.setAttribute('color', cfg.color);
      desc.setAttribute('color', '#888888');
    });

    // Label nama tombol (di muka tombol)
    const btnText = document.createElement('a-text');
    btnText.setAttribute('value', cfg.btnLabel);
    btnText.setAttribute('position', `0 0 ${cfg.d / 2 + 0.005}`);
    btnText.setAttribute('color', '#ffffff');
    btnText.setAttribute('align', 'center');
    btnText.setAttribute('scale', '0.18 0.18 0.18');
    btnText.setAttribute('font', 'monoid');

    // Keterangan fungsi (di atas tombol)
    const desc = document.createElement('a-text');
    desc.setAttribute('value', cfg.descLabel);
    desc.setAttribute('position', `0 ${cfg.h / 2 + 0.04} 0`);
    desc.setAttribute('color', '#888888');
    desc.setAttribute('align', 'center');
    desc.setAttribute('scale', '0.1 0.1 0.1');

    group.appendChild(box);
    group.appendChild(btnText);
    group.appendChild(desc);
    parent.appendChild(group);
  },

  _ambilCitra: function () {
    this._scanCount++;
    const statusEl = document.querySelector('#xrayStatusText');
    const screenEl = document.querySelector('#xrayScreenDisplay');
    const indAlert = document.querySelector('#indAlert');
    const indStby  = document.querySelector('#indStandby');
    
    // --- Elemen Efek Sinar X-Ray ---
    const xrayBeam = document.querySelector('#xrayBeam');
    const xraySpotlight = document.querySelector('#xraySpotlight');

    if (!statusEl) return;

    // Status berubah: scanning
    statusEl.setAttribute('value', '▶ MEMINDAI...\nMOHON TIDAK BERGERAK');
    statusEl.setAttribute('color', '#ffaa00');
    if (screenEl) screenEl.setAttribute('color', '#0a0800');
    if (indAlert) indAlert.setAttribute('color', '#ffaa00');
    if (indStby)  indStby.setAttribute('color', '#444400');

    // === MEMULAI SINAR X-RAY ===
    if (xrayBeam) xrayBeam.emit('start-xray');
    if (xraySpotlight) xraySpotlight.emit('start-xray');

    // Waktu tunggu selesai scan (2.2 detik)
    setTimeout(() => {
      const ts = new Date().toLocaleTimeString('id-ID');
      statusEl.setAttribute('value',
        `✓ CITRA #${this._scanCount} SELESAI\n\nRES: 2048 × 2048 px\nkVp: 80 | mAs: 200\nWaktu: ${ts}`
      );
      statusEl.setAttribute('color', '#00ff88');
      if (screenEl) screenEl.setAttribute('color', '#050f07');
      if (indAlert) indAlert.setAttribute('color', '#ff3333');
      if (indStby)  indStby.setAttribute('color', '#ffaa00');

      // === MEMATIKAN SINAR X-RAY ===
      if (xrayBeam) xrayBeam.emit('stop-xray');
      if (xraySpotlight) xraySpotlight.emit('stop-xray');
      
    }, 2200);
  },

  _simpanData: function () {
    const statusEl = document.querySelector('#xrayStatusText');
    if (!statusEl) return;
    const prev = statusEl.getAttribute('value');
    statusEl.setAttribute('value', '💾 MENYIMPAN DATA...\nSilakan tunggu');
    statusEl.setAttribute('color', '#44ff88');
    setTimeout(() => {
      statusEl.setAttribute('value', prev + '\n\n✓ TERSIMPAN');
      statusEl.setAttribute('color', '#00ff88');
    }, 1200);
  },

  _hapusData: function () {
    const statusEl = document.querySelector('#xrayStatusText');
    const screenEl = document.querySelector('#xrayScreenDisplay');
    if (!statusEl) return;
    statusEl.setAttribute('value', '🗑 CITRA DIHAPUS\nSIAP SCAN BARU');
    statusEl.setAttribute('color', '#ff4444');
    if (screenEl) screenEl.setAttribute('color', '#0a0a0a');
    setTimeout(() => {
      statusEl.setAttribute('value', 'SIAP\nMENGAMBIL CITRA');
      statusEl.setAttribute('color', '#00ff88');
    }, 1600);
  },

  _openPatientForm: function () {
    const overlay = document.getElementById('patientFormOverlay');
    if (overlay) overlay.style.display = 'flex';
  }
});
