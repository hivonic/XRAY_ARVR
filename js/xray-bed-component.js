// ==============================
// xray-bed-component.js
// X-Ray Bed terpisah.
// Kasur atas bisa digeser halus di sumbu X dengan hold.
// Model tubuh ikut bergeser mengikuti kasur atas.
// Saat reset semua, kasur atas ikut kembali ke posisi awal.
// ==============================

AFRAME.registerComponent('xray-bed', {
  init: function () {
    this.bedTop = null;

    // Posisi X kasur atas.
    this.bedTopX = 0;

    // Batas geser kasur atas.
    this.minX = -1.2;
    this.maxX = 1.2;

    // Kecepatan geser saat tombol ditahan.
    this.slideSpeed = 0.55;

    // Arah geser:
    // -1 = kiri
    //  0 = diam
    //  1 = kanan
    this.slideDirection = 0;

    // Status hold tombol.
    this.isSlidingBed = false;

    this.createBedParts();
    this.createSlideButtons();

    console.log('xray-bed aktif: kasur atas bisa geser halus X dan tubuh ikut geser.');
  },

  createBedParts: function () {
    const bedParts = [
      {
        id: 'bedTop',
        src: '#bedTopModel',
        position: '0 0 0',
        rotation: '0 90 0',
        scale: '1 1 1',
        isTop: true
      },
      {
        id: 'bedBottom',
        src: '#bedBottomModel',
        position: '0 0 0',
        rotation: '0 90 0',
        scale: '1 1 1',
        isTop: false
      },
      {
        id: 'bedPair',
        src: '#bedPairModel',
        position: '0 0 0',
        rotation: '0 90 0',
        scale: '1 1 1',
        isTop: false
      },
      {
        id: 'bedPolePair',
        src: '#bedPolePairModel',
        position: '0 0 0',
        rotation: '0 90 0',
        scale: '1 1 1',
        isTop: false
      }
    ];

    bedParts.forEach((part) => {
      const model = document.createElement('a-gltf-model');

      model.setAttribute('id', part.id);
      model.setAttribute('src', part.src);
      model.setAttribute('position', part.position);
      model.setAttribute('rotation', part.rotation);
      model.setAttribute('scale', part.scale);
      model.setAttribute('class', 'xray-bed-part');

      model.addEventListener('model-loaded', () => {
        console.log('Bed part loaded:', part.id);
      });

      model.addEventListener('model-error', () => {
        console.log('Bed part gagal dimuat:', part.id, part.src);
      });

      if (part.isTop) {
        this.bedTop = model;
      }

      this.el.appendChild(model);
    });
  },

  createSlideButtons: function () {
    // ==============================
    // Tombol geser kiri
    // ==============================

    const leftButtonGroup = document.createElement('a-entity');
    leftButtonGroup.setAttribute('position', '0.7 1.05 0.5');
    leftButtonGroup.setAttribute('rotation', '0 0 0');

    const leftButton = document.createElement('a-box');
    leftButton.setAttribute('id', 'btnBedSlideLeft');
    leftButton.setAttribute('class', 'clickable');
    leftButton.setAttribute('position', '0 0 0');
    leftButton.setAttribute('width', '0.35');
    leftButton.setAttribute('height', '0.12');
    leftButton.setAttribute('depth', '0.25');
    leftButton.setAttribute('color', '#2255ff');

    const leftText = document.createElement('a-text');
    leftText.setAttribute('value', '<-');
    leftText.setAttribute('position', '0 0 0.14');
    leftText.setAttribute('color', '#ffffff');
    leftText.setAttribute('align', 'center');
    leftText.setAttribute('scale', '0.5 0.5 0.5');

    this.addHoldEvents(leftButton, -1);

    leftButtonGroup.appendChild(leftButton);
    leftButtonGroup.appendChild(leftText);
    this.el.appendChild(leftButtonGroup);

    // ==============================
    // Tombol geser kanan
    // ==============================

    const rightButtonGroup = document.createElement('a-entity');
    rightButtonGroup.setAttribute('position', '1.05 1.05 0.5');
    rightButtonGroup.setAttribute('rotation', '0 0 0');

    const rightButton = document.createElement('a-box');
    rightButton.setAttribute('id', 'btnBedSlideRight');
    rightButton.setAttribute('class', 'clickable');
    rightButton.setAttribute('position', '0 0 0');
    rightButton.setAttribute('width', '0.35');
    rightButton.setAttribute('height', '0.12');
    rightButton.setAttribute('depth', '0.25');
    rightButton.setAttribute('color', '#2255ff');

    const rightText = document.createElement('a-text');
    rightText.setAttribute('value', '->');
    rightText.setAttribute('position', '0 0 0.14');
    rightText.setAttribute('color', '#ffffff');
    rightText.setAttribute('align', 'center');
    rightText.setAttribute('scale', '0.5 0.5 0.5');

    this.addHoldEvents(rightButton, 1);

    rightButtonGroup.appendChild(rightButton);
    rightButtonGroup.appendChild(rightText);
    this.el.appendChild(rightButtonGroup);
  },

  addHoldEvents: function (button, direction) {
    const normalColor = '#2255ff';
    const activeColor = '#00aaee';

    const start = (event) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.startSlide(direction);
      button.setAttribute('color', activeColor);
    };

    const stop = (event) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.stopSlide();
      button.setAttribute('color', normalColor);
    };

    // ==============================
    // Desktop mouse
    // ==============================

    button.addEventListener('mousedown', start);
    window.addEventListener('mouseup', stop);

    // ==============================
    // Pointer event
    // Untuk mouse, touch, dan browser modern.
    // ==============================

    button.addEventListener('pointerdown', start);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);

    // ==============================
    // Touchscreen
    // ==============================

    button.addEventListener('touchstart', start);
    window.addEventListener('touchend', stop);
    window.addEventListener('touchcancel', stop);

    // ==============================
    // VR controller
    // ==============================

    button.addEventListener('triggerdown', start);
    button.addEventListener('triggerup', stop);

    // ==============================
    // Safety stop
    // Kalau browser kehilangan fokus, baru berhenti.
    // ==============================

    window.addEventListener('blur', stop);

    // PENTING:
    // Jangan pakai mouseleave untuk stop.
    // Karena saat kasur bergerak, cursor/ray bisa dianggap keluar tombol.
  },

  startSlide: function (direction) {
    stopAllBoneGrabs();

    this.slideDirection = direction;
    this.isSlidingBed = true;
  },

  stopSlide: function () {
    this.slideDirection = 0;
    this.isSlidingBed = false;
  },

  slideBedTop: function (deltaX) {
    if (!this.bedTop) {
      console.log('Kasur atas belum ditemukan.');
      return;
    }

    const oldX = this.bedTopX;
    let newX = oldX + deltaX;

    if (newX < this.minX) {
      newX = this.minX;
    }

    if (newX > this.maxX) {
      newX = this.maxX;
    }

    const realDeltaX = newX - oldX;

    if (realDeltaX === 0) {
      this.stopSlide();
      return;
    }

    this.bedTopX = newX;

    // Geser kasur atas.
    this.bedTop.setAttribute('position', `${this.bedTopX} 0 0`);

    // Geser tubuh mengikuti kasur atas.
    this.movePatientBody(realDeltaX);
  },

  movePatientBody: function (deltaX) {
    const body = document.querySelector('#maleBodyModel');

    if (!body) {
      console.log('maleBodyModel tidak ditemukan.');
      return;
    }

    const pos = body.getAttribute('position');

    body.setAttribute('position', {
      x: pos.x + deltaX,
      y: pos.y,
      z: pos.z
    });

    updateMaleBodyMatrix();
  },

  resetBedTop: function () {
    if (!this.bedTop) {
      console.log('Kasur atas belum ditemukan untuk reset.');
      return;
    }

    this.bedTopX = 0;
    this.slideDirection = 0;
    this.isSlidingBed = false;

    this.bedTop.setAttribute('position', '0 0 0');

    console.log('Kasur atas di-reset ke posisi awal.');
  },

  tick: function (time, timeDelta) {
    if (!this.isSlidingBed) return;
    if (this.slideDirection === 0) return;

    const deltaSecond = timeDelta / 1000;
    const deltaX = this.slideDirection * this.slideSpeed * deltaSecond;

    this.slideBedTop(deltaX);
  }
});