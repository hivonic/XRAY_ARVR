// ==============================
// room-component.js
// Membuat lantai, dinding, atap, dan RUANG OPERATOR (partisi dalam).
// ==============================

AFRAME.registerComponent('room-builder', {
  init: function () {
    this.el.innerHTML = `
      <a-box position="0 0 0" width="10" height="0.1" depth="10" color="#888888"></a-box>

      <a-box position="0 1.5 -5" width="10" height="3" depth="0.1" color="#dddddd"></a-box>

      <a-box position="0 1.5 5" width="10" height="3" depth="0.1" color="#dddddd"></a-box>

      <a-box position="-5 1.5 0" width="0.1" height="3" depth="10" color="#cccccc"></a-box>

      <a-box position="5 1.5 0" width="0.1" height="3" depth="10" color="#cccccc"></a-box>

      <a-box position="0 3 0" width="10" height="0.1" depth="10" color="#eeeeee"></a-box>

      <a-box position="1.75 0.5 2.5" width="0.1" height="1" depth="5" color="#cccccc"></a-box>
      <a-box position="1.75 2.75 2.5" width="0.1" height="0.5" depth="5" color="#cccccc"></a-box>
      <a-box position="1.75 1.75 0.75" width="0.1" height="1.5" depth="1.5" color="#cccccc"></a-box>
      <a-box position="1.75 1.75 4.25" width="0.1" height="1.5" depth="1.5" color="#cccccc"></a-box>

      <a-box position="1.75 1.75 2.5" width="0.06" height="1.5" depth="2" color="#99ccee" opacity="0.35" transparent="true"></a-box>
      
      <a-box position="1.75 1.0 2.5" width="0.14" height="0.05" depth="2.05" color="#444444"></a-box>
      <a-box position="1.75 2.5 2.5" width="0.14" height="0.05" depth="2.05" color="#444444"></a-box>
      <a-box position="1.75 1.75 1.5" width="0.14" height="1.45" depth="0.05" color="#444444"></a-box>
      <a-box position="1.75 1.75 3.5" width="0.14" height="1.45" depth="0.05" color="#444444"></a-box>

      <a-box position="3.9 1.5 0" width="2.2" height="3" depth="0.1" color="#cccccc"></a-box>
      
      <a-box position="2.3 2.5 0" width="1.0" height="1.0" depth="0.1" color="#cccccc"></a-box>

      <a-box position="2.8 1.0 0" width="0.05" height="2" depth="0.12" color="#aaaaaa"></a-box> <a-box position="1.8 1.0 0" width="0.05" height="2" depth="0.12" color="#aaaaaa"></a-box> <a-box position="2.3 2.0 0" width="1.0" height="0.05" depth="0.12" color="#aaaaaa"></a-box> <a-text 
        value="RUANG OPERATOR" 
        position="1.68 2.8 2.5" 
        rotation="0 -90 0" 
        color="#003366" 
        align="center" 
        scale="0.25 0.25 0.25">
      </a-text>

      <a-box position="3.375 0.06 2.5" width="3.25" height="0.02" depth="5" color="#9a9a9a"></a-box>
    `;

    console.log('room-builder aktif (ruang operator tertutup separuh dengan celah pintu di belakang).');
  }
});