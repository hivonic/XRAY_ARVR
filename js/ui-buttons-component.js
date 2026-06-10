// ==============================
// ui-buttons-component.js
// Membuat semua tombol custom secara otomatis.
// Supaya index.html tidak panjang.
// ==============================

AFRAME.registerComponent('xray-ui-buttons', {
  init: function () {
    const buttons = [
      {
        groupId: 'buttonNextPose',
        boxId: 'btnNextPose',
        position: '-1.6 1.15 0.75',
        color: '#0066ff',
        label: 'GANTI\nPOSISI',
        textScale: '0.23 0.23 0.23',
        componentName: 'cycle-body-pose',
        componentValue: ''
      },
      {
        groupId: 'buttonResetAll',
        boxId: 'btnResetAll',
        position: '-1.6 1.45 0.75',
        color: '#ff3333',
        label: 'RESET\nSEMUA',
        textScale: '0.23 0.23 0.23',
        componentName: 'reset-body-and-arm-pose',
        componentValue: ''
      },
      {
        groupId: 'buttonResetRightArm',
        boxId: 'btnResetRightArm',
        position: '-1.6 1.15 1.20',
        color: '#ffaa00',
        label: 'RESET\nTANGAN KANAN',
        textScale: '0.21 0.21 0.21',
        componentName: 'reset-arm-pose',
        componentValue: 'side: right'
      },
      {
        groupId: 'buttonResetLeftArm',
        boxId: 'btnResetLeftArm',
        position: '-1.6 1.15 1.65',
        color: '#00aa88',
        label: 'RESET\nTANGAN KIRI',
        textScale: '0.21 0.21 0.21',
        componentName: 'reset-arm-pose',
        componentValue: 'side: left'
      },
      {
        groupId: 'buttonResetRightLeg',
        boxId: 'btnResetRightLeg',
        position: '-1.6 1.45 1.20',
        color: '#8844ff',
        label: 'RESET\nKAKI KANAN',
        textScale: '0.21 0.21 0.21',
        componentName: 'reset-leg-pose',
        componentValue: 'side: right'
      },
      {
        groupId: 'buttonResetLeftLeg',
        boxId: 'btnResetLeftLeg',
        position: '-1.6 1.45 1.65',
        color: '#44ccff',
        label: 'RESET\nKAKI KIRI',
        textScale: '0.21 0.21 0.21',
        componentName: 'reset-leg-pose',
        componentValue: 'side: left'
      }
    ];

    buttons.forEach((item) => {
      const group = document.createElement('a-entity');

      group.setAttribute('id', item.groupId);
      group.setAttribute('position', item.position);
      group.setAttribute('rotation', '0 0 0');

      const box = document.createElement('a-box');

      box.setAttribute('id', item.boxId);
      box.setAttribute('class', 'clickable');
      box.setAttribute('position', '0 0 0');
      box.setAttribute('rotation', '90 90 0');
      box.setAttribute('width', '0.45');
      box.setAttribute('height', '0.16');
      box.setAttribute('depth', '0.28');
      box.setAttribute('color', item.color);

      if (item.componentValue) {
        box.setAttribute(item.componentName, item.componentValue);
      } else {
        box.setAttribute(item.componentName, '');
      }

      const text = document.createElement('a-text');

      text.setAttribute('value', item.label);
      text.setAttribute('position', '0.09 0 0');
      text.setAttribute('rotation', '0 90 0');
      text.setAttribute('scale', item.textScale);
      text.setAttribute('color', '#ffffff');
      text.setAttribute('align', 'center');

      group.appendChild(box);
      group.appendChild(text);

      this.el.appendChild(group);
    });

    console.log('xray-ui-buttons aktif.');
  }
});