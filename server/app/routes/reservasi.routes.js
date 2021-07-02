module.exports = app => {
    const reservasi = require("../controllers/reservasi.controller.js");
  
    // Create a new reservasi
    app.post("/reservasi", reservasi.create);

    app.get("/reservasi/filter/filter", reservasi.getReservasiByIdLapAndTglMain);
  
    // Retrieve all reservasi
    app.get("/reservasi", reservasi.findAll);
  
    // Retrieve a single reservasi with reservasiId
    app.get("/reservasi/:reservasiId", reservasi.findOne);

    app.get("/reservasi/detail/:reservasiId", reservasi.findDetail);

    // Retrieve a single reservasi with userId
    app.get("/reservasi/user/:userId", reservasi.getReservasiByIdPengguna);
  
    // Update a reservasi with reservasiId
    app.put("/reservasi/:reservasiId", reservasi.update);
  
    // Delete a reservasi with reservasiId
    app.put("/reservasi/delete/:reservasiId", reservasi.delete);
  
    // Delete all reservasi
    app.delete("/reservasi", reservasi.deleteAll);
  };