// ==============================
// movement-components.js
// Component pergerakan user / batas ruangan.
// Membuat user tidak bisa keluar ruangan dan tidak bisa masuk area meja X-ray.
// ==============================

AFRAME.registerComponent('limit-room', {
  tick: function () {
    const pos = this.el.object3D.position;

    // ==============================
    // BATAS TEMBOK RUANGAN
    // User tidak bisa melewati batas ruangan.
    // ==============================

    if (pos.x < ROOM_LIMIT.minX) {
      pos.x = ROOM_LIMIT.minX;
    }

    if (pos.x > ROOM_LIMIT.maxX) {
      pos.x = ROOM_LIMIT.maxX;
    }

    if (pos.z < ROOM_LIMIT.minZ) {
      pos.z = ROOM_LIMIT.minZ;
    }

    if (pos.z > ROOM_LIMIT.maxZ) {
      pos.z = ROOM_LIMIT.maxZ;
    }

    // ==============================
    // BATAS MEJA X-RAY
    // User tidak bisa masuk ke area meja.
    // ==============================

    const tableMinX = XRAY_TABLE_LIMIT.minX;
    const tableMaxX = XRAY_TABLE_LIMIT.maxX;
    const tableMinZ = XRAY_TABLE_LIMIT.minZ;
    const tableMaxZ = XRAY_TABLE_LIMIT.maxZ;

    const insideTable =
      pos.x > tableMinX &&
      pos.x < tableMaxX &&
      pos.z > tableMinZ &&
      pos.z < tableMaxZ;

    if (insideTable) {
      const distLeft = Math.abs(pos.x - tableMinX);
      const distRight = Math.abs(pos.x - tableMaxX);
      const distBack = Math.abs(pos.z - tableMinZ);
      const distFront = Math.abs(pos.z - tableMaxZ);

      const minDist = Math.min(
        distLeft,
        distRight,
        distBack,
        distFront
      );

      if (minDist === distLeft) {
        pos.x = tableMinX;
      } else if (minDist === distRight) {
        pos.x = tableMaxX;
      } else if (minDist === distBack) {
        pos.z = tableMinZ;
      } else {
        pos.z = tableMaxZ;
      }
    }
  }
});