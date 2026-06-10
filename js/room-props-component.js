// ==============================
// room-props-component.js
// Prop ruangan X-Ray dengan label & interaksi
// ==============================

AFRAME.registerComponent('room-props', {
  init: function () {
    const el = this.el;

    // Ruang X-Ray Utama
    this._buildIVStand(el, '-3.5 0 1.5');
    this._buildFilmViewer(el, '-4.8 0 -2');       // Ganti rak obat → negatoskop/film viewer
    this._buildXRayConsole(el, '-2.5 0 -0.8');    // Ganti troli medis → konsol X-Ray
    this._buildFileCabinet(el, '4.5 0 -4.5');
    this._buildSink(el, '4.7 0 2');
    this._buildOxygenTank(el, '3.5 0 -4.5');
    this._buildOxygenTank(el, '3.0 0 -4.5');
    this._buildWhiteboard(el, '0 1.5 -4.93');
    this._buildTrashBin(el, '1.9 0 3.8');
    this._buildFuseBox(el, '-4.85 1.8 -0.5');

    // Ruang Operator (di booth kanan-depan: x=2~5, z=0~5)
    this._buildOperatorDesk(el, '3.2 0 3.5');
    this._buildOperatorChair(el, '3.2 0 2.8');
    this._buildMonitorStation(el, '3.2 0 4.4');
    this._buildFilmStorageRack(el, '4.7 0 1.5');  // Rak film X-Ray
    this._buildPACSWorkstation(el, '2.1 0 4.4');  // Workstation PACS

    console.log('room-props aktif.');
  },

  // ================================
  // IV STAND / TIANG INFUS
  // ================================
  _buildIVStand: function (parent, pos) {
    const g = this._group(parent, pos);

    const pole = document.createElement('a-cylinder');
    pole.setAttribute('position', '0 1 0');
    pole.setAttribute('radius', '0.018');
    pole.setAttribute('height', '2');
    pole.setAttribute('color', '#aaaaaa');
    g.appendChild(pole);

    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const leg = document.createElement('a-cylinder');
      leg.setAttribute('radius', '0.01');
      leg.setAttribute('height', '0.5');
      leg.setAttribute('color', '#888888');
      leg.setAttribute('rotation', `0 0 85`);
      leg.setAttribute('position', `${Math.cos(angle) * 0.25} 0.02 ${Math.sin(angle) * 0.25}`);
      g.appendChild(leg);
    }

    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const wheel = document.createElement('a-sphere');
      wheel.setAttribute('radius', '0.04');
      wheel.setAttribute('color', '#555555');
      wheel.setAttribute('position', `${Math.cos(angle) * 0.28} 0.04 ${Math.sin(angle) * 0.28}`);
      g.appendChild(wheel);
    }

    for (let s of [-1, 1]) {
      const hook = document.createElement('a-box');
      hook.setAttribute('position', `${s * 0.1} 1.95 0`);
      hook.setAttribute('width', '0.08'); hook.setAttribute('height', '0.12'); hook.setAttribute('depth', '0.02');
      hook.setAttribute('color', '#999999');
      g.appendChild(hook);
    }

    const bag = document.createElement('a-box');
    bag.setAttribute('position', '0 1.78 0');
    bag.setAttribute('width', '0.12'); bag.setAttribute('height', '0.22'); bag.setAttribute('depth', '0.04');
    bag.setAttribute('color', '#cceecc');
    bag.setAttribute('opacity', '0.85');
    g.appendChild(bag);

    const bagLabel = document.createElement('a-text');
    bagLabel.setAttribute('value', 'NaCl\n0.9%');
    bagLabel.setAttribute('position', '0.021 1.78 0');
    bagLabel.setAttribute('rotation', '0 90 0');
    bagLabel.setAttribute('color', '#004400');
    bagLabel.setAttribute('align', 'center');
    bagLabel.setAttribute('scale', '0.05 0.05 0.05');
    g.appendChild(bagLabel);

    const tube = document.createElement('a-cylinder');
    tube.setAttribute('position', '0 1.5 0');
    tube.setAttribute('radius', '0.005');
    tube.setAttribute('height', '0.6');
    tube.setAttribute('color', '#dddddd');
    g.appendChild(tube);

    this._floatLabel(g, '0 2.15 0', 'TIANG INFUS\n(IV Stand)');
  },

  // ================================
  // NEGATOSKOP / FILM VIEWER
  // (Pengganti Rak Obat - lebih relevan untuk radiologi)
  // ================================
  _buildFilmViewer: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 90 0');

    // Dinding mounting
    const mount = document.createElement('a-box');
    mount.setAttribute('position', '0 1.4 0');
    mount.setAttribute('width', '0.06'); mount.setAttribute('height', '0.1'); mount.setAttribute('depth', '0.1');
    mount.setAttribute('color', '#888888');
    g.appendChild(mount);

    // Frame negatoskop (2 panel)
    for (let p of [-0.55, 0.55]) {
      const frame = document.createElement('a-box');
      frame.setAttribute('position', `0 1.3 ${p}`);
      frame.setAttribute('width', '0.08'); frame.setAttribute('height', '0.75'); frame.setAttribute('depth', '0.62');
      frame.setAttribute('color', '#444444');
      g.appendChild(frame);

      // Panel cahaya (backlit)
      const panel = document.createElement('a-box');
      panel.setAttribute('position', `0.045 1.3 ${p}`);
      panel.setAttribute('width', '0.01'); panel.setAttribute('height', '0.68'); panel.setAttribute('depth', '0.56');
      panel.setAttribute('color', '#ddeeff');
      panel.setAttribute('opacity', '0.9');
      panel.setAttribute('transparent', 'true');
      g.appendChild(panel);

      // Film X-Ray (warna gelap dengan pola tulang samar)
      const film = document.createElement('a-box');
      film.setAttribute('position', `0.05 1.3 ${p}`);
      film.setAttribute('width', '0.005'); film.setAttribute('height', '0.60'); film.setAttribute('depth', '0.48');
      film.setAttribute('color', '#112233');
      film.setAttribute('opacity', '0.75');
      film.setAttribute('transparent', 'true');
      g.appendChild(film);
    }

    // Tiang penyangga
    const stand = document.createElement('a-box');
    stand.setAttribute('position', '0 0.6 0');
    stand.setAttribute('width', '0.06'); stand.setAttribute('height', '1.2'); stand.setAttribute('depth', '0.06');
    stand.setAttribute('color', '#666666');
    g.appendChild(stand);

    // Kaki
    const base = document.createElement('a-box');
    base.setAttribute('position', '0 0.05 0');
    base.setAttribute('width', '0.08'); base.setAttribute('height', '0.06'); base.setAttribute('depth', '0.6');
    base.setAttribute('color', '#555555');
    g.appendChild(base);

    this._floatLabel(g, '0 1.85 0', 'NEGATOSKOP\nPembaca Film X-Ray');
  },

  // ================================
  // KONSOL KONTROL X-RAY
  // (Pengganti Troli Medis)
  // ================================
  _buildXRayConsole: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 45 0');

    // Body konsol
    const body = document.createElement('a-box');
    body.setAttribute('position', '0 0.65 0');
    body.setAttribute('width', '0.85'); body.setAttribute('height', '1.0'); body.setAttribute('depth', '0.5');
    body.setAttribute('color', '#e0e0e0');
    g.appendChild(body);

    // Panel kontrol miring (angled top)
    const panel = document.createElement('a-box');
    panel.setAttribute('position', '0 1.18 0.08');
    panel.setAttribute('rotation', '-30 0 0');
    panel.setAttribute('width', '0.8'); panel.setAttribute('height', '0.35'); panel.setAttribute('depth', '0.04');
    panel.setAttribute('color', '#555555');
    g.appendChild(panel);

    // Layar kecil di panel
    const screen = document.createElement('a-box');
    screen.setAttribute('position', '0 1.22 0.12');
    screen.setAttribute('rotation', '-30 0 0');
    screen.setAttribute('width', '0.45'); screen.setAttribute('height', '0.22'); screen.setAttribute('depth', '0.01');
    screen.setAttribute('color', '#003366');
    g.appendChild(screen);

    const screenText = document.createElement('a-text');
    screenText.setAttribute('value', 'kV: 80\nmA: 200\nExposure: 0.1s');
    screenText.setAttribute('position', '0 1.22 0.135');
    screenText.setAttribute('rotation', '-30 0 0');
    screenText.setAttribute('color', '#00ff88');
    screenText.setAttribute('align', 'center');
    screenText.setAttribute('scale', '0.06 0.06 0.06');
    g.appendChild(screenText);

    // Tombol-tombol
    const colors = ['#ff4444', '#ffaa00', '#44ff44', '#4488ff', '#ffffff'];
    for (let i = 0; i < 5; i++) {
      const btn = document.createElement('a-cylinder');
      btn.setAttribute('position', `${-0.25 + i * 0.125} 1.19 0.19`);
      btn.setAttribute('rotation', '-30 0 0');
      btn.setAttribute('radius', '0.025'); btn.setAttribute('height', '0.02');
      btn.setAttribute('color', colors[i]);
      g.appendChild(btn);
    }

    // Tombol EXPOSE besar
    const exposeBtn = document.createElement('a-cylinder');
    exposeBtn.setAttribute('position', '0.3 1.0 0.26');
    exposeBtn.setAttribute('radius', '0.045'); exposeBtn.setAttribute('height', '0.02');
    exposeBtn.setAttribute('color', '#cc0000');
    g.appendChild(exposeBtn);
    const exposeLabel = document.createElement('a-text');
    exposeLabel.setAttribute('value', 'EXPOSE');
    exposeLabel.setAttribute('position', '0.3 1.015 0.26');
    exposeLabel.setAttribute('color', '#ffffff');
    exposeLabel.setAttribute('align', 'center');
    exposeLabel.setAttribute('scale', '0.04 0.04 0.04');
    g.appendChild(exposeLabel);

    // Kabel
    const cable = document.createElement('a-cylinder');
    cable.setAttribute('position', '0 0.1 0.1');
    cable.setAttribute('radius', '0.012'); cable.setAttribute('height', '0.3');
    cable.setAttribute('color', '#333333');
    g.appendChild(cable);

    this._floatLabel(g, '0 1.55 0', 'KONSOL X-RAY\nPengatur Paparan');
  },

  // ================================
  // LEMARI FILE
  // ================================
  _buildFileCabinet: function (parent, pos) {
    const g = this._group(parent, pos);

    const cab = document.createElement('a-box');
    cab.setAttribute('position', '0 0.9 0');
    cab.setAttribute('width', '0.65'); cab.setAttribute('height', '1.8'); cab.setAttribute('depth', '0.5');
    cab.setAttribute('color', '#999999');
    g.appendChild(cab);

    for (let i = 0; i < 4; i++) {
      const dr = document.createElement('a-box');
      dr.setAttribute('position', `0 ${0.2 + i * 0.42} 0.26`);
      dr.setAttribute('width', '0.58'); dr.setAttribute('height', '0.38'); dr.setAttribute('depth', '0.02');
      dr.setAttribute('color', '#888888');
      g.appendChild(dr);

      const hdl = document.createElement('a-box');
      hdl.setAttribute('position', `0 ${0.2 + i * 0.42} 0.275`);
      hdl.setAttribute('width', '0.2'); hdl.setAttribute('height', '0.03'); hdl.setAttribute('depth', '0.02');
      hdl.setAttribute('color', '#cccccc');
      g.appendChild(hdl);
    }

    this._floatLabel(g, '0 1.95 0', 'LEMARI ARSIP\nData Rekam Medis');
  },

  // ================================
  // WASTAFEL
  // ================================
  _buildSink: function (parent, pos) {
    const g = this._group(parent, pos);

    const counter = document.createElement('a-box');
    counter.setAttribute('position', '0 0.85 0');
    counter.setAttribute('width', '0.2'); counter.setAttribute('height', '1.7'); counter.setAttribute('depth', '0.6');
    counter.setAttribute('color', '#cccccc');
    g.appendChild(counter);

    const bowl = document.createElement('a-box');
    bowl.setAttribute('position', '0.08 0.88 0');
    bowl.setAttribute('width', '0.05'); bowl.setAttribute('height', '0.12'); bowl.setAttribute('depth', '0.45');
    bowl.setAttribute('color', '#eeeeee');
    g.appendChild(bowl);

    const tap = document.createElement('a-cylinder');
    tap.setAttribute('position', '0.1 0.97 0');
    tap.setAttribute('radius', '0.015'); tap.setAttribute('height', '0.1');
    tap.setAttribute('color', '#aaaaaa');
    g.appendChild(tap);

    const tapHead = document.createElement('a-cylinder');
    tapHead.setAttribute('position', '0.14 1.0 0');
    tapHead.setAttribute('radius', '0.015'); tapHead.setAttribute('height', '0.1');
    tapHead.setAttribute('rotation', '0 0 90');
    tapHead.setAttribute('color', '#aaaaaa');
    g.appendChild(tapHead);

    const soap = document.createElement('a-box');
    soap.setAttribute('position', '0.1 0.97 0.2');
    soap.setAttribute('width', '0.07'); soap.setAttribute('height', '0.12'); soap.setAttribute('depth', '0.05');
    soap.setAttribute('color', '#4488ff');
    g.appendChild(soap);

    const soapLabel = document.createElement('a-text');
    soapLabel.setAttribute('value', 'ANTISEPTIK');
    soapLabel.setAttribute('position', '0.135 0.97 0.2');
    soapLabel.setAttribute('rotation', '0 90 0');
    soapLabel.setAttribute('color', '#ffffff');
    soapLabel.setAttribute('align', 'center');
    soapLabel.setAttribute('scale', '0.04 0.04 0.04');
    g.appendChild(soapLabel);

    this._floatLabel(g, '0.1 1.2 0', 'WASTAFEL\nCuci Tangan');
  },

  // ================================
  // TABUNG OKSIGEN
  // ================================
  _buildOxygenTank: function (parent, pos) {
    const g = this._group(parent, pos);

    const tank = document.createElement('a-cylinder');
    tank.setAttribute('position', '0 0.5 0');
    tank.setAttribute('radius', '0.1'); tank.setAttribute('height', '0.95');
    tank.setAttribute('color', '#88bbff');
    g.appendChild(tank);

    const top = document.createElement('a-sphere');
    top.setAttribute('position', '0 0.96 0');
    top.setAttribute('radius', '0.1'); top.setAttribute('color', '#5588dd');
    g.appendChild(top);

    const valve = document.createElement('a-cylinder');
    valve.setAttribute('position', '0 1.05 0');
    valve.setAttribute('radius', '0.025'); valve.setAttribute('height', '0.08');
    valve.setAttribute('color', '#888888');
    g.appendChild(valve);

    const label = document.createElement('a-plane');
    label.setAttribute('position', '0.101 0.5 0');
    label.setAttribute('rotation', '0 90 0');
    label.setAttribute('width', '0.14'); label.setAttribute('height', '0.2');
    label.setAttribute('color', '#ffffff');
    g.appendChild(label);

    const labelText = document.createElement('a-text');
    labelText.setAttribute('value', 'O₂');
    labelText.setAttribute('position', '0.105 0.5 0');
    labelText.setAttribute('rotation', '0 90 0');
    labelText.setAttribute('color', '#0055ff');
    labelText.setAttribute('align', 'center');
    labelText.setAttribute('scale', '0.1 0.1 0.1');
    g.appendChild(labelText);

    const chain = document.createElement('a-cylinder');
    chain.setAttribute('position', '0.1 0.75 0');
    chain.setAttribute('radius', '0.005'); chain.setAttribute('height', '0.2');
    chain.setAttribute('rotation', '0 0 90');
    chain.setAttribute('color', '#666666');
    g.appendChild(chain);

    this._floatLabel(g, '0 1.2 0', 'TABUNG OKSIGEN\n(O₂ Medis)');
  },

  // ================================
  // WHITEBOARD
  // ================================
  _buildWhiteboard: function (parent, pos) {
    const g = this._group(parent, pos);

    const frame = document.createElement('a-box');
    frame.setAttribute('position', '0 0 0');
    frame.setAttribute('width', '2.5'); frame.setAttribute('height', '1.2'); frame.setAttribute('depth', '0.04');
    frame.setAttribute('color', '#555555');
    g.appendChild(frame);

    const board = document.createElement('a-plane');
    board.setAttribute('position', '0 0 0.021');
    board.setAttribute('width', '2.35'); board.setAttribute('height', '1.1');
    board.setAttribute('color', '#f5f5f5');
    g.appendChild(board);

    const txt = document.createElement('a-text');
    txt.setAttribute('value', 'RUANG X-RAY\n━━━━━━━━━━━━━━━━━\nPasien: -\nDokter: -\nStatus: Standby');
    txt.setAttribute('id', 'whiteboardText');
    txt.setAttribute('position', '0 0 0.025');
    txt.setAttribute('color', '#000000');
    txt.setAttribute('align', 'center');
    txt.setAttribute('scale', '0.22 0.22 0.22');
    g.appendChild(txt);

    const tray = document.createElement('a-box');
    tray.setAttribute('position', '0 -0.63 0.04');
    tray.setAttribute('width', '2.4');
    tray.setAttribute('height', '0.06');
    tray.setAttribute('depth', '0.09');
    tray.setAttribute('color', '#777777');
    g.appendChild(tray);

    const markerDefs = [
      { color: '#ff3333', offset: -0.2 },
      { color: '#2244ff', offset:  0.0 },
      { color: '#111111', offset:  0.2 }
    ];

    markerDefs.forEach((m) => {
      const marker = document.createElement('a-cylinder');
      marker.setAttribute('position', `${m.offset} -0.61 0.07`);
      marker.setAttribute('radius', '0.013');
      marker.setAttribute('height', '0.16');
      marker.setAttribute('rotation', '0 0 90');
      marker.setAttribute('color', m.color);
      g.appendChild(marker);

      const cap = document.createElement('a-cylinder');
      cap.setAttribute('position', `${m.offset + 0.09} -0.61 0.07`);
      cap.setAttribute('radius', '0.014');
      cap.setAttribute('height', '0.03');
      cap.setAttribute('rotation', '0 0 90');
      cap.setAttribute('color', '#222222');
      g.appendChild(cap);
    });
  },

  // ================================
  // TEMPAT SAMPAH MEDIS
  // ================================
  _buildTrashBin: function (parent, pos) {
    const g = this._group(parent, pos);

    const bin = document.createElement('a-cylinder');
    bin.setAttribute('position', '0 0.3 0');
    bin.setAttribute('radius', '0.18'); bin.setAttribute('height', '0.55');
    bin.setAttribute('color', '#cc0000');
    g.appendChild(bin);

    const lid = document.createElement('a-cylinder');
    lid.setAttribute('position', '0 0.59 0');
    lid.setAttribute('radius', '0.185'); lid.setAttribute('height', '0.05');
    lid.setAttribute('color', '#aa0000');
    g.appendChild(lid);

    const label = document.createElement('a-text');
    label.setAttribute('value', '⚠ LIMBAH\nMEDIS');
    label.setAttribute('position', '0 0.3 0.19');
    label.setAttribute('color', '#ffffff');
    label.setAttribute('scale', '0.1 0.1 0.1');
    label.setAttribute('align', 'center');
    g.appendChild(label);

    const pedal = document.createElement('a-box');
    pedal.setAttribute('position', '0 0.04 0.2');
    pedal.setAttribute('width', '0.1'); pedal.setAttribute('height', '0.02'); pedal.setAttribute('depth', '0.08');
    pedal.setAttribute('color', '#888888');
    g.appendChild(pedal);

    this._floatLabel(g, '0 0.75 0', 'TEMPAT SAMPAH\nLimbah Medis B3');
  },

  // ================================
  // PANEL LISTRIK
  // ================================
  _buildFuseBox: function (parent, pos) {
    const g = this._group(parent, pos);

    const box = document.createElement('a-box');
    box.setAttribute('position', '0 0 0');
    box.setAttribute('width', '0.08'); box.setAttribute('height', '0.5'); box.setAttribute('depth', '0.4');
    box.setAttribute('color', '#888888');
    g.appendChild(box);

    const door = document.createElement('a-box');
    door.setAttribute('position', '0.045 0 0');
    door.setAttribute('width', '0.01'); door.setAttribute('height', '0.44'); door.setAttribute('depth', '0.36');
    door.setAttribute('color', '#999999');
    g.appendChild(door);

    for (let i = 0; i < 6; i++) {
      const sw = document.createElement('a-box');
      sw.setAttribute('position', `0.051 ${0.15 - i * 0.055} ${0.08 - (i % 3) * 0.1}`);
      sw.setAttribute('width', '0.01'); sw.setAttribute('height', '0.035'); sw.setAttribute('depth', '0.02');
      sw.setAttribute('color', i % 2 === 0 ? '#00bb44' : '#cc4400');
      g.appendChild(sw);
    }

    this._floatLabel(g, '0 0.38 0', 'PANEL LISTRIK\nSistem X-Ray');
  },

  // ================================
  // MEJA OPERATOR (di ruang operator)
  // ================================
  _buildOperatorDesk: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 180 0');

    // Permukaan meja
    const top = document.createElement('a-box');
    top.setAttribute('position', '0 0.75 0');
    top.setAttribute('width', '1.6'); top.setAttribute('height', '0.05'); top.setAttribute('depth', '0.7');
    top.setAttribute('color', '#e8e0d0');
    g.appendChild(top);

    // Kaki meja
    for (let x of [-0.72, 0.72]) {
      for (let z of [-0.3, 0.3]) {
        const leg = document.createElement('a-box');
        leg.setAttribute('position', `${x} 0.37 ${z}`);
        leg.setAttribute('width', '0.05'); leg.setAttribute('height', '0.75'); leg.setAttribute('depth', '0.05');
        leg.setAttribute('color', '#aaaaaa');
        g.appendChild(leg);
      }
    }

    // Keyboard
    const kb = document.createElement('a-box');
    kb.setAttribute('position', '0 0.78 0.1');
    kb.setAttribute('width', '0.45'); kb.setAttribute('height', '0.02'); kb.setAttribute('depth', '0.16');
    kb.setAttribute('color', '#333333');
    g.appendChild(kb);

    // Mouse
    const mouse = document.createElement('a-box');
    mouse.setAttribute('position', '0.28 0.775 0.1');
    mouse.setAttribute('width', '0.06'); mouse.setAttribute('height', '0.015'); mouse.setAttribute('depth', '0.1');
    mouse.setAttribute('color', '#555555');
    mouse.setAttribute('rotation', '0 0 0');
    g.appendChild(mouse);

    // Mousepad
    const pad = document.createElement('a-box');
    pad.setAttribute('position', '0.28 0.772 0.1');
    pad.setAttribute('width', '0.2'); pad.setAttribute('height', '0.005'); pad.setAttribute('depth', '0.18');
    pad.setAttribute('color', '#1a1a3e');
    g.appendChild(pad);

    // Kabel di meja
    const cable = document.createElement('a-cylinder');
    cable.setAttribute('position', '0 0.77 -0.2');
    cable.setAttribute('radius', '0.006'); cable.setAttribute('height', '0.35');
    cable.setAttribute('rotation', '0 0 90');
    cable.setAttribute('color', '#555555');
    g.appendChild(cable);

    this._floatLabel(g, '0 1.0 0', 'MEJA OPERATOR\nKonsol Kendali');
  },

  // ================================
  // KURSI OPERATOR (di ruang operator, bisa diklik)
  // ================================
  _buildOperatorChair: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 180 0');
    g.setAttribute('id', 'operatorChairGroup');

    const seat = document.createElement('a-cylinder');
    seat.setAttribute('id', 'operatorChairSeat');
    seat.setAttribute('class', 'clickable');
    seat.setAttribute('position', '0 0.5 0');
    seat.setAttribute('radius', '0.25'); seat.setAttribute('height', '0.07');
    seat.setAttribute('color', '#0a1628');
    g.appendChild(seat);

    const pole = document.createElement('a-cylinder');
    pole.setAttribute('position', '0 0.3 0');
    pole.setAttribute('radius', '0.03'); pole.setAttribute('height', '0.5');
    pole.setAttribute('color', '#888888');
    g.appendChild(pole);

    const back = document.createElement('a-box');
    back.setAttribute('position', '0 0.85 -0.22');
    back.setAttribute('width', '0.45'); back.setAttribute('height', '0.55'); back.setAttribute('depth', '0.07');
    back.setAttribute('color', '#0a1628');
    g.appendChild(back);

    for (let s of [-1, 1]) {
      const arm = document.createElement('a-box');
      arm.setAttribute('position', `${s * 0.27} 0.65 -0.08`);
      arm.setAttribute('width', '0.05'); arm.setAttribute('height', '0.04'); arm.setAttribute('depth', '0.35');
      arm.setAttribute('color', '#1a2540');
      g.appendChild(arm);
    }

    for (let i = 0; i < 5; i++) {
      const ang = (i / 5) * Math.PI * 2;
      const lp = document.createElement('a-cylinder');
      lp.setAttribute('radius', '0.015'); lp.setAttribute('height', '0.3');
      lp.setAttribute('color', '#777777');
      lp.setAttribute('position', `${Math.cos(ang) * 0.25} 0.08 ${Math.sin(ang) * 0.25}`);
      lp.setAttribute('rotation', '0 0 90');
      g.appendChild(lp);

      const wheel = document.createElement('a-sphere');
      wheel.setAttribute('position', `${Math.cos(ang) * 0.28} 0.04 ${Math.sin(ang) * 0.28}`);
      wheel.setAttribute('radius', '0.04'); wheel.setAttribute('color', '#333333');
      g.appendChild(wheel);
    }

    this._floatLabel(g, '0 1.15 0', 'KURSI OPERATOR\nKlik untuk memutar');

    this._chairAngle2 = 0;
    seat.addEventListener('click', () => {
      this._chairAngle2 = (this._chairAngle2 + 90) % 360;
      g.setAttribute('rotation', `0 ${180 + this._chairAngle2} 0`);
    });
    seat.addEventListener('mouseenter', () => seat.setAttribute('color', '#1a2a48'));
    seat.addEventListener('mouseleave', () => seat.setAttribute('color', '#0a1628'));
  },

  // ================================
  // MONITOR STATION (monitor besar di atas meja operator)
  // ================================
  _buildMonitorStation: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 180 0');

    // Dudukan monitor
    const stand = document.createElement('a-box');
    stand.setAttribute('position', '0 0.85 0');
    stand.setAttribute('width', '0.12'); stand.setAttribute('height', '0.1'); stand.setAttribute('depth', '0.25');
    stand.setAttribute('color', '#333333');
    g.appendChild(stand);

    const neck = document.createElement('a-box');
    neck.setAttribute('position', '0 1.0 0');
    neck.setAttribute('width', '0.06'); neck.setAttribute('height', '0.3'); neck.setAttribute('depth', '0.06');
    neck.setAttribute('color', '#333333');
    g.appendChild(neck);

    // Monitor utama (besar, untuk baca film X-Ray)
    const monMain = document.createElement('a-box');
    monMain.setAttribute('position', '0 1.45 0.05');
    monMain.setAttribute('rotation', '-5 0 0');
    monMain.setAttribute('width', '0.9'); monMain.setAttribute('height', '0.55'); monMain.setAttribute('depth', '0.04');
    monMain.setAttribute('color', '#222222');
    g.appendChild(monMain);

    const screenMain = document.createElement('a-box');
    screenMain.setAttribute('position', '0 1.45 0.07');
    screenMain.setAttribute('rotation', '-5 0 0');
    screenMain.setAttribute('width', '0.84'); screenMain.setAttribute('height', '0.50'); screenMain.setAttribute('depth', '0.01');
    screenMain.setAttribute('color', '#001122');
    g.appendChild(screenMain);

    // Tampilan DICOM/PACS di layar
    const screenTxt = document.createElement('a-text');
    screenTxt.setAttribute('value', 'DICOM VIEWER\n───────────────\nPatient ID: 00124\nStudy: Thorax AP\nkV:80 mAs:20\n[READY]');
    screenTxt.setAttribute('position', '0 1.45 0.085');
    screenTxt.setAttribute('rotation', '-5 0 0');
    screenTxt.setAttribute('color', '#00ccff');
    screenTxt.setAttribute('align', 'center');
    screenTxt.setAttribute('scale', '0.07 0.07 0.07');
    g.appendChild(screenTxt);

    // Monitor kedua (samping, lebih kecil)
    const mon2 = document.createElement('a-box');
    mon2.setAttribute('position', '0.58 1.42 0.08');
    mon2.setAttribute('rotation', '-5 -30 0');
    mon2.setAttribute('width', '0.5'); mon2.setAttribute('height', '0.32'); mon2.setAttribute('depth', '0.03');
    mon2.setAttribute('color', '#222222');
    g.appendChild(mon2);

    const screen2 = document.createElement('a-box');
    screen2.setAttribute('position', '0.6 1.42 0.1');
    screen2.setAttribute('rotation', '-5 -30 0');
    screen2.setAttribute('width', '0.45'); screen2.setAttribute('height', '0.28'); screen2.setAttribute('depth', '0.01');
    screen2.setAttribute('color', '#0a1200');
    g.appendChild(screen2);

    const screen2Txt = document.createElement('a-text');
    screen2Txt.setAttribute('value', 'RIS/HIS\nAntrian: 3\nStatus: OK');
    screen2Txt.setAttribute('position', '0.62 1.42 0.11');
    screen2Txt.setAttribute('rotation', '-5 -30 0');
    screen2Txt.setAttribute('color', '#88ff44');
    screen2Txt.setAttribute('align', 'center');
    screen2Txt.setAttribute('scale', '0.065 0.065 0.065');
    g.appendChild(screen2Txt);

    this._floatLabel(g, '0 2.0 0', 'WORKSTATION DICOM\nBaca Citra Radiologi');
  },

  // ================================
  // RAK FILM X-RAY (pengganti rak obat di ruang operator)
  // ================================
  _buildFilmStorageRack: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 90 0');

    // Frame rak
    const frame = document.createElement('a-box');
    frame.setAttribute('position', '0 1.1 0');
    frame.setAttribute('width', '0.12'); frame.setAttribute('height', '2.2'); frame.setAttribute('depth', '0.75');
    frame.setAttribute('color', '#aaaaaa');
    g.appendChild(frame);

    // Rak-rak penyangga film
    for (let i = 0; i < 6; i++) {
      const shelf = document.createElement('a-box');
      shelf.setAttribute('position', `0.06 ${0.15 + i * 0.35} 0`);
      shelf.setAttribute('width', '0.04'); shelf.setAttribute('height', '0.025'); shelf.setAttribute('depth', '0.72');
      shelf.setAttribute('color', '#888888');
      g.appendChild(shelf);

      // Amplop/folder film X-Ray berdiri
      const filmColors = ['#2a2a2a', '#1a1a1a', '#333322', '#222233', '#1a2a1a'];
      for (let f = 0; f < 4; f++) {
        const filmEnv = document.createElement('a-box');
        filmEnv.setAttribute('position', `0.08 ${0.28 + i * 0.35} ${-0.28 + f * 0.19}`);
        filmEnv.setAttribute('width', '0.015'); filmEnv.setAttribute('height', '0.22'); filmEnv.setAttribute('depth', '0.16');
        filmEnv.setAttribute('color', filmColors[f % 5]);
        g.appendChild(filmEnv);

        // Label putih di amplop
        const filmLabel = document.createElement('a-box');
        filmLabel.setAttribute('position', `0.09 ${0.31 + i * 0.35} ${-0.28 + f * 0.19}`);
        filmLabel.setAttribute('width', '0.005'); filmLabel.setAttribute('height', '0.06'); filmLabel.setAttribute('depth', '0.1');
        filmLabel.setAttribute('color', '#ffffff');
        g.appendChild(filmLabel);
      }
    }

    this._floatLabel(g, '0.06 2.45 0', 'RAK FILM X-RAY\nArsip Citra Radiologi');
  },

  // ================================
  // WORKSTATION PACS (meja samping di ruang operator)
  // ================================
  _buildPACSWorkstation: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 180 0');

    // CPU tower
    const cpu = document.createElement('a-box');
    cpu.setAttribute('position', '0 0.35 0');
    cpu.setAttribute('width', '0.2'); cpu.setAttribute('height', '0.55'); cpu.setAttribute('depth', '0.42');
    cpu.setAttribute('color', '#dddddd');
    g.appendChild(cpu);

    // Drive bays
    for (let i = 0; i < 3; i++) {
      const bay = document.createElement('a-box');
      bay.setAttribute('position', `0.101 ${0.35 - i * 0.09} 0`);
      bay.setAttribute('width', '0.01'); bay.setAttribute('height', '0.07'); bay.setAttribute('depth', '0.38');
      bay.setAttribute('color', '#bbbbbb');
      g.appendChild(bay);
    }

    // LED power
    const led = document.createElement('a-sphere');
    led.setAttribute('position', '0.102 0.58 0.1');
    led.setAttribute('radius', '0.012');
    led.setAttribute('color', '#00ff44');
    g.appendChild(led);

    // Meja kecil di bawah CPU
    const deskSmall = document.createElement('a-box');
    deskSmall.setAttribute('position', '0 0.66 0');
    deskSmall.setAttribute('width', '0.35'); deskSmall.setAttribute('height', '0.03'); deskSmall.setAttribute('depth', '0.5');
    deskSmall.setAttribute('color', '#cccccc');
    g.appendChild(deskSmall);

    // Monitor kecil di atasnya
    const mon = document.createElement('a-box');
    mon.setAttribute('position', '0 1.0 0');
    mon.setAttribute('width', '0.38'); mon.setAttribute('height', '0.28'); mon.setAttribute('depth', '0.03');
    mon.setAttribute('color', '#111111');
    g.appendChild(mon);

    const scr = document.createElement('a-box');
    scr.setAttribute('position', '0 1.0 0.02');
    scr.setAttribute('width', '0.34'); scr.setAttribute('height', '0.24'); scr.setAttribute('depth', '0.01');
    scr.setAttribute('color', '#001a00');
    g.appendChild(scr);

    const scrTxt = document.createElement('a-text');
    scrTxt.setAttribute('value', 'PACS SERVER\nStorage: 4.2 TB\nUptime: 99.8%');
    scrTxt.setAttribute('position', '0 1.0 0.03');
    scrTxt.setAttribute('color', '#00ff66');
    scrTxt.setAttribute('align', 'center');
    scrTxt.setAttribute('scale', '0.06 0.06 0.06');
    g.appendChild(scrTxt);

    this._floatLabel(g, '0 1.4 0', 'PACS WORKSTATION\nPenyimpanan Citra');
  },

  // ================================
  // HELPER: Label melayang di atas benda
  // ================================
  _floatLabel: function (parent, pos, text) {
    const bg = document.createElement('a-plane');
    const posArr = pos.split(' ').map(Number);
    bg.setAttribute('position', `${posArr[0]} ${posArr[1]} ${posArr[2] + 0.01}`);
    bg.setAttribute('width', '0.55');
    bg.setAttribute('height', '0.14');
    bg.setAttribute('color', '#000000');
    bg.setAttribute('opacity', '0.55');
    bg.setAttribute('rotation', '0 0 0');
    parent.appendChild(bg);

    const lbl = document.createElement('a-text');
    lbl.setAttribute('value', text);
    lbl.setAttribute('position', `${posArr[0]} ${posArr[1]} ${posArr[2] + 0.02}`);
    lbl.setAttribute('color', '#00ffcc');
    lbl.setAttribute('align', 'center');
    lbl.setAttribute('scale', '0.1 0.1 0.1');
    parent.appendChild(lbl);
  },

  _group: function (parent, pos) {
    const g = document.createElement('a-entity');
    g.setAttribute('position', pos);
    parent.appendChild(g);
    return g;
  }
});
