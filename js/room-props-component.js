// ==============================
// room-props-component.js
// Prop ruangan X-Ray dengan label & interaksi
// ==============================

AFRAME.registerComponent('room-props', {
  init: function () {
    const el = this.el;

    // Ruang X-Ray Utama
    this._buildIVStand(el, '-3.5 0 1.5');
    this._buildFilmViewer(el, '-4.8 0 -2');       
    this._buildXRayConsole(el, '-2.5 0 -0.8');    
    this._buildFileCabinet(el, '4.5 0 -4.5');
    this._buildSink(el, '4.7 0 2');
    this._buildOxygenTank(el, '3.5 0 -4.5');
    this._buildOxygenTank(el, '3.0 0 -4.5');
    this._buildWhiteboard(el, '0 1.5 -4.93');
    this._buildTrashBin(el, '1.9 0 3.8');
    this._buildFuseBox(el, '-4.85 1.8 -0.5');

    // ============ TAMBAHAN: KURSI TUNGGU ============
    this._buildWaitingChairs(el, '-4.0 0 4.5');

    // ============ TAMBAHAN: RAK BUKU MODERN ============
    // Posisi tepat di sudut kotak biru (mepet tembok kanan, antara pintu ganda & ruang operator)
    this._buildModernBookshelf(el, '4.75 0 -0.75');

    // ============ MEJA PENDAFTARAN (Desain L-Shape Presisi) ============
    this._buildRegistrationDesk(el, '-3.5 0 -3.5');

    // Ruang Operator 
    this._buildOperatorChair(el, '3.2 0 2.5');
    this._buildFilmStorageRack(el, '4.8 0 2.9');  

    console.log('room-props aktif (Vas bunga dihapus, Rak modern ditambahkan ke sudut).');
  },

  // ================================
  // RAK BUKU MODERN (Non-Kayu)
  // ================================
  _buildModernBookshelf: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 -90 0'); // Menghadap ke tengah ruangan

    // Frame Modern Kiri & Kanan (Warna Abu-abu / Aluminium)
    const leftFrame = document.createElement('a-box');
    leftFrame.setAttribute('position', '-0.58 1 0');
    leftFrame.setAttribute('width', '0.04'); leftFrame.setAttribute('height', '2.0'); leftFrame.setAttribute('depth', '0.35');
    leftFrame.setAttribute('color', '#bdc3c7');
    g.appendChild(leftFrame);

    const rightFrame = document.createElement('a-box');
    rightFrame.setAttribute('position', '0.58 1 0');
    rightFrame.setAttribute('width', '0.04'); rightFrame.setAttribute('height', '2.0'); rightFrame.setAttribute('depth', '0.35');
    rightFrame.setAttribute('color', '#bdc3c7');
    g.appendChild(rightFrame);

    // Backing Belakang (Hitam elegan / Gelap)
    const back = document.createElement('a-box');
    back.setAttribute('position', '0 1 -0.16');
    back.setAttribute('width', '1.2'); back.setAttribute('height', '2.0'); back.setAttribute('depth', '0.02');
    back.setAttribute('color', '#2c3e50');
    g.appendChild(back);

    // Rak / Shelves (Warna Putih Bersih)
    const shelfHeights = [0.1, 0.5, 0.9, 1.3, 1.7];
    const colors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6', '#e67e22', '#ecf0f1', '#95a5a6'];

    shelfHeights.forEach(h => {
      const shelf = document.createElement('a-box');
      shelf.setAttribute('position', `0 ${h} 0`);
      shelf.setAttribute('width', '1.16'); shelf.setAttribute('height', '0.03'); shelf.setAttribute('depth', '0.33');
      shelf.setAttribute('color', '#ecf0f1'); 
      g.appendChild(shelf);

      // Tambah tumpukan buku di setiap rak
      if (h < 1.7) { // Kosongkan sedikit rak paling atas agar rapi
        let currentX = -0.55;
        while (currentX < 0.5) {
          const w = 0.03 + Math.random() * 0.04;
          const hBook = 0.2 + Math.random() * 0.12;
          const d = 0.15 + Math.random() * 0.05;
          if (currentX + w > 0.55) break;

          // Memberikan celah acak antar buku agar terlihat natural
          if (Math.random() > 0.75) {
              currentX += 0.05;
              continue;
          }

          const book = document.createElement('a-box');
          book.setAttribute('position', `${currentX + w/2} ${h + 0.015 + hBook/2} -0.05`);
          book.setAttribute('width', w);
          book.setAttribute('height', hBook);
          book.setAttribute('depth', d);
          book.setAttribute('color', colors[Math.floor(Math.random() * colors.length)]);
          
          // Memiringkan beberapa buku sesekali
          if (Math.random() > 0.85) {
            book.setAttribute('rotation', `0 0 ${Math.random() * 20 - 10}`);
          }

          g.appendChild(book);
          currentX += w + 0.002;
        }
      }
    });

    this._floatLabel(g, '0 2.2 0', 'RAK BUKU MEDIS');
  },

  // ================================
  // KURSI TUNGGU (3 SEAT)
  // ================================
  _buildWaitingChairs: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 180 0'); 

    for (let x of [-0.8, 0.8]) {
      const leg = document.createElement('a-cylinder');
      leg.setAttribute('position', `${x} 0.15 0`);
      leg.setAttribute('radius', '0.03'); 
      leg.setAttribute('height', '0.3');
      leg.setAttribute('color', '#7f8c8d');
      g.appendChild(leg);

      const foot = document.createElement('a-box');
      foot.setAttribute('position', `${x} 0.02 0`);
      foot.setAttribute('width', '0.06'); 
      foot.setAttribute('height', '0.04'); 
      foot.setAttribute('depth', '0.4');
      foot.setAttribute('color', '#34495e');
      g.appendChild(foot);
    }

    const beam = document.createElement('a-box');
    beam.setAttribute('position', '0 0.3 0');
    beam.setAttribute('width', '1.9'); 
    beam.setAttribute('height', '0.06'); 
    beam.setAttribute('depth', '0.06');
    beam.setAttribute('color', '#bdc3c7');
    g.appendChild(beam);

    const seatPositions = [-0.6, 0, 0.6];
    for (let x of seatPositions) {
      const seat = document.createElement('a-box');
      seat.setAttribute('position', `${x} 0.4 0.1`);
      seat.setAttribute('width', '0.45'); 
      seat.setAttribute('height', '0.04'); 
      seat.setAttribute('depth', '0.4');
      seat.setAttribute('color', '#2980b9'); 
      g.appendChild(seat);

      const back = document.createElement('a-box');
      back.setAttribute('position', `${x} 0.65 -0.12`);
      back.setAttribute('rotation', '-15 0 0');
      back.setAttribute('width', '0.45'); 
      back.setAttribute('height', '0.5'); 
      back.setAttribute('depth', '0.04');
      back.setAttribute('color', '#2980b9');
      g.appendChild(back);
      
      const arm = document.createElement('a-cylinder');
      arm.setAttribute('position', `${x - 0.28} 0.5 0.1`);
      arm.setAttribute('rotation', '90 0 0');
      arm.setAttribute('radius', '0.015'); 
      arm.setAttribute('height', '0.35');
      arm.setAttribute('color', '#95a5a6');
      g.appendChild(arm);
    }

    const armRight = document.createElement('a-cylinder');
    armRight.setAttribute('position', `0.88 0.5 0.1`);
    armRight.setAttribute('rotation', '90 0 0');
    armRight.setAttribute('radius', '0.015'); 
    armRight.setAttribute('height', '0.35');
    armRight.setAttribute('color', '#95a5a6');
    g.appendChild(armRight);

    this._floatLabel(g, '0 1.1 0', 'KURSI TUNGGU');
  },

  // ================================
  // MEJA PENDAFTARAN (Desain Gambar L-Shape + Kisi-Kisi)
  // ================================
  _buildRegistrationDesk: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 0 0');

    // 1. MEJA BAWAH (Area Kerja)
    const deskLeft = document.createElement('a-box');
    deskLeft.setAttribute('position', '-0.4 0.375 0');
    deskLeft.setAttribute('width', '1.6'); deskLeft.setAttribute('height', '0.75'); deskLeft.setAttribute('depth', '0.5');
    deskLeft.setAttribute('color', '#fdfdfd');
    g.appendChild(deskLeft);

    const topLeft = document.createElement('a-box');
    topLeft.setAttribute('position', '-0.4 0.77 0');
    topLeft.setAttribute('width', '1.6'); topLeft.setAttribute('height', '0.04'); topLeft.setAttribute('depth', '0.55');
    topLeft.setAttribute('color', '#b8860b');
    g.appendChild(topLeft);

    const kickLeft = document.createElement('a-box');
    kickLeft.setAttribute('position', '-0.4 0.075 0');
    kickLeft.setAttribute('width', '1.5'); kickLeft.setAttribute('height', '0.15'); kickLeft.setAttribute('depth', '0.4');
    kickLeft.setAttribute('color', '#b8860b');
    g.appendChild(kickLeft);

    const deskRight = document.createElement('a-box');
    deskRight.setAttribute('position', '0.7 0.375 -0.35');
    deskRight.setAttribute('width', '0.6'); deskRight.setAttribute('height', '0.75'); deskRight.setAttribute('depth', '1.2');
    deskRight.setAttribute('color', '#fdfdfd');
    g.appendChild(deskRight);

    const topRight = document.createElement('a-box');
    topRight.setAttribute('position', '0.7 0.77 -0.35');
    topRight.setAttribute('width', '0.6'); topRight.setAttribute('height', '0.04'); topRight.setAttribute('depth', '1.25');
    topRight.setAttribute('color', '#b8860b');
    g.appendChild(topRight);

    const kickRight = document.createElement('a-box');
    kickRight.setAttribute('position', '0.7 0.075 -0.35');
    kickRight.setAttribute('width', '0.5'); kickRight.setAttribute('height', '0.15'); kickRight.setAttribute('depth', '1.1');
    kickRight.setAttribute('color', '#b8860b');
    g.appendChild(kickRight);

    // 2. COUNTER TINGGI (Sisi Kiri Depan)
    const counterBody = document.createElement('a-box');
    counterBody.setAttribute('position', '-0.4 0.5 0.375');
    counterBody.setAttribute('width', '1.6'); counterBody.setAttribute('height', '1.0'); counterBody.setAttribute('depth', '0.25');
    counterBody.setAttribute('color', '#fdfdfd');
    g.appendChild(counterBody);

    const counterTop = document.createElement('a-box');
    counterTop.setAttribute('position', '-0.4 1.025 0.375');
    counterTop.setAttribute('width', '1.65'); counterTop.setAttribute('height', '0.05'); counterTop.setAttribute('depth', '0.3');
    counterTop.setAttribute('color', '#2c3e50');
    g.appendChild(counterTop);

    // 3. KISI-KISI KAYU (Sisi Kanan Depan)
    const slatBack = document.createElement('a-box');
    slatBack.setAttribute('position', '0.7 0.5 0.3');
    slatBack.setAttribute('width', '0.6'); slatBack.setAttribute('height', '1.0'); slatBack.setAttribute('depth', '0.1');
    slatBack.setAttribute('color', '#fdfdfd');
    g.appendChild(slatBack);

    const slatTop = document.createElement('a-box');
    slatTop.setAttribute('position', '0.7 1.025 0.375');
    slatTop.setAttribute('width', '0.65'); slatTop.setAttribute('height', '0.05'); slatTop.setAttribute('depth', '0.3');
    slatTop.setAttribute('color', '#2c3e50');
    g.appendChild(slatTop);

    for (let i = 0; i < 5; i++) {
      const slat = document.createElement('a-box');
      slat.setAttribute('position', `${0.46 + i*0.12} 0.5 0.4`);
      slat.setAttribute('width', '0.04'); slat.setAttribute('height', '1.0'); slat.setAttribute('depth', '0.04');
      slat.setAttribute('color', '#b8860b');
      g.appendChild(slat);
    }

    // 4. PAPAN NAMA (PENDAFTARAN & LOKET)
    const mainSignBox = document.createElement('a-box');
    mainSignBox.setAttribute('position', '-0.4 1.8 0.375');
    mainSignBox.setAttribute('width', '1.4'); mainSignBox.setAttribute('height', '0.4'); mainSignBox.setAttribute('depth', '0.05');
    mainSignBox.setAttribute('color', '#17a2b8');
    g.appendChild(mainSignBox);

    const mainSignText = document.createElement('a-text');
    mainSignText.setAttribute('value', 'PENDAFTARAN\nREGISTRATION');
    mainSignText.setAttribute('position', '-0.4 1.8 0.41');
    mainSignText.setAttribute('color', '#ffffff');
    mainSignText.setAttribute('align', 'center');
    mainSignText.setAttribute('scale', '0.35 0.35 0.35');
    g.appendChild(mainSignText);

    const loketSignBox = document.createElement('a-box');
    loketSignBox.setAttribute('position', '0.7 1.25 0.375');
    loketSignBox.setAttribute('width', '0.4'); loketSignBox.setAttribute('height', '0.15'); loketSignBox.setAttribute('depth', '0.02');
    loketSignBox.setAttribute('color', '#17a2b8');
    g.appendChild(loketSignBox);

    const loketSignText = document.createElement('a-text');
    loketSignText.setAttribute('value', 'LOKET');
    loketSignText.setAttribute('position', '0.7 1.25 0.39');
    loketSignText.setAttribute('color', '#ffffff');
    loketSignText.setAttribute('align', 'center');
    loketSignText.setAttribute('scale', '0.25 0.25 0.25');
    g.appendChild(loketSignText);

    // 5. PROPERTI (Komputer, Kursi)
    const monBase = document.createElement('a-cylinder');
    monBase.setAttribute('position', '-0.4 0.8 -0.1');
    monBase.setAttribute('radius', '0.05'); monBase.setAttribute('height', '0.04');
    monBase.setAttribute('color', '#333333');
    g.appendChild(monBase);

    const monNeck = document.createElement('a-box');
    monNeck.setAttribute('position', '-0.4 0.9 -0.1');
    monNeck.setAttribute('width', '0.02'); monNeck.setAttribute('height', '0.2'); monNeck.setAttribute('depth', '0.02');
    monNeck.setAttribute('color', '#333333');
    g.appendChild(monNeck);

    const monScreen = document.createElement('a-box');
    monScreen.setAttribute('position', '-0.4 0.98 -0.05');
    monScreen.setAttribute('rotation', '-5 0 0');
    monScreen.setAttribute('width', '0.45'); monScreen.setAttribute('height', '0.28'); monScreen.setAttribute('depth', '0.02');
    monScreen.setAttribute('color', '#111111');
    g.appendChild(monScreen);

    const kb = document.createElement('a-box');
    kb.setAttribute('position', '-0.4 0.795 -0.25');
    kb.setAttribute('width', '0.35'); kb.setAttribute('height', '0.01'); kb.setAttribute('depth', '0.12');
    kb.setAttribute('color', '#eeeeee');
    g.appendChild(kb);

    const seat = document.createElement('a-cylinder');
    seat.setAttribute('position', '-0.4 0.45 -0.7');
    seat.setAttribute('radius', '0.22'); seat.setAttribute('height', '0.05');
    seat.setAttribute('color', '#555555');
    g.appendChild(seat);

    const seatBack = document.createElement('a-box');
    seatBack.setAttribute('position', '-0.4 0.75 -0.9');
    seatBack.setAttribute('width', '0.35'); seatBack.setAttribute('height', '0.35'); seatBack.setAttribute('depth', '0.05');
    seatBack.setAttribute('color', '#555555');
    g.appendChild(seatBack);

    const seatPole = document.createElement('a-cylinder');
    seatPole.setAttribute('position', '-0.4 0.225 -0.7');
    seatPole.setAttribute('radius', '0.03'); seatPole.setAttribute('height', '0.45');
    seatPole.setAttribute('color', '#222222');
    g.appendChild(seatPole);
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
  // ================================
  _buildFilmViewer: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 90 0');

    const mount = document.createElement('a-box');
    mount.setAttribute('position', '0 1.4 0');
    mount.setAttribute('width', '0.06'); mount.setAttribute('height', '0.1'); mount.setAttribute('depth', '0.1');
    mount.setAttribute('color', '#888888');
    g.appendChild(mount);

    for (let p of [-0.55, 0.55]) {
      const frame = document.createElement('a-box');
      frame.setAttribute('position', `0 1.3 ${p}`);
      frame.setAttribute('width', '0.08'); frame.setAttribute('height', '0.75'); frame.setAttribute('depth', '0.62');
      frame.setAttribute('color', '#444444');
      g.appendChild(frame);

      const panel = document.createElement('a-box');
      panel.setAttribute('position', `0.045 1.3 ${p}`);
      panel.setAttribute('width', '0.01'); panel.setAttribute('height', '0.68'); panel.setAttribute('depth', '0.56');
      panel.setAttribute('color', '#ddeeff');
      panel.setAttribute('opacity', '0.9');
      panel.setAttribute('transparent', 'true');
      g.appendChild(panel);

      const film = document.createElement('a-box');
      film.setAttribute('position', `0.05 1.3 ${p}`);
      film.setAttribute('width', '0.005'); film.setAttribute('height', '0.60'); film.setAttribute('depth', '0.48');
      film.setAttribute('color', '#112233');
      film.setAttribute('opacity', '0.75');
      film.setAttribute('transparent', 'true');
      g.appendChild(film);
    }

    const stand = document.createElement('a-box');
    stand.setAttribute('position', '0 0.6 0');
    stand.setAttribute('width', '0.06'); stand.setAttribute('height', '1.2'); stand.setAttribute('depth', '0.06');
    stand.setAttribute('color', '#666666');
    g.appendChild(stand);

    const base = document.createElement('a-box');
    base.setAttribute('position', '0 0.05 0');
    base.setAttribute('width', '0.08'); base.setAttribute('height', '0.06'); base.setAttribute('depth', '0.6');
    base.setAttribute('color', '#555555');
    g.appendChild(base);

    this._floatLabel(g, '0 1.85 0', 'NEGATOSKOP');
  },

  // ================================
  // KONSOL KONTROL X-RAY
  // ================================
  _buildXRayConsole: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 45 0');

    const body = document.createElement('a-box');
    body.setAttribute('position', '0 0.65 0');
    body.setAttribute('width', '0.85'); body.setAttribute('height', '1.0'); body.setAttribute('depth', '0.5');
    body.setAttribute('color', '#e0e0e0');
    g.appendChild(body);

    const panel = document.createElement('a-box');
    panel.setAttribute('position', '0 1.18 0.08');
    panel.setAttribute('rotation', '-30 0 0');
    panel.setAttribute('width', '0.8'); panel.setAttribute('height', '0.35'); panel.setAttribute('depth', '0.04');
    panel.setAttribute('color', '#555555');
    g.appendChild(panel);

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

    const colors = ['#ff4444', '#ffaa00', '#44ff44', '#4488ff', '#ffffff'];
    for (let i = 0; i < 5; i++) {
      const btn = document.createElement('a-cylinder');
      btn.setAttribute('position', `${-0.25 + i * 0.125} 1.19 0.19`);
      btn.setAttribute('rotation', '-30 0 0');
      btn.setAttribute('radius', '0.025'); btn.setAttribute('height', '0.02');
      btn.setAttribute('color', colors[i]);
      g.appendChild(btn);
    }

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

    const pedal = document.createElement('a-box');
    pedal.setAttribute('position', '0 0.04 0.2');
    pedal.setAttribute('width', '0.1'); pedal.setAttribute('height', '0.02'); pedal.setAttribute('depth', '0.08');
    pedal.setAttribute('color', '#888888');
    g.appendChild(pedal);
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
  // KURSI OPERATOR 
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
  // RAK FILM X-RAY 
  // ================================
  _buildFilmStorageRack: function (parent, pos) {
    const g = this._group(parent, pos);
    g.setAttribute('rotation', '0 180 0');

    const frame = document.createElement('a-box');
    frame.setAttribute('position', '0 1.1 0');
    frame.setAttribute('width', '0.12'); frame.setAttribute('height', '2.2'); frame.setAttribute('depth', '0.75');
    frame.setAttribute('color', '#aaaaaa');
    g.appendChild(frame);

    for (let i = 0; i < 6; i++) {
      const shelf = document.createElement('a-box');
      shelf.setAttribute('position', `0.06 ${0.15 + i * 0.35} 0`);
      shelf.setAttribute('width', '0.04'); shelf.setAttribute('height', '0.025'); shelf.setAttribute('depth', '0.72');
      shelf.setAttribute('color', '#888888');
      g.appendChild(shelf);

      const filmColors = ['#2a2a2a', '#1a1a1a', '#333322', '#222233', '#1a2a1a'];
      for (let f = 0; f < 4; f++) {
        const filmEnv = document.createElement('a-box');
        filmEnv.setAttribute('position', `0.08 ${0.28 + i * 0.35} ${-0.28 + f * 0.19}`);
        filmEnv.setAttribute('width', '0.015'); filmEnv.setAttribute('height', '0.22'); filmEnv.setAttribute('depth', '0.16');
        filmEnv.setAttribute('color', filmColors[f % 5]);
        g.appendChild(filmEnv);

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
  // HELPER: Label melayang 
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