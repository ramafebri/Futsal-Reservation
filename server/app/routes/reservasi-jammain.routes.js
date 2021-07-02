module.exports = app => {
    const resJamMain = require("../controllers/reservasi-jammain.controller.js");
  
    // Create
    app.post("/resjammain", resJamMain.create);
  
    // Retrieve all
    app.get("/resjammain", resJamMain.findAll);
  
    // Retrieve a single
    app.get("/resjammain/:resJamMainId", resJamMain.findOne);

    app.get("/resjammain/reservasi/:reservasiId", resJamMain.findByReservasiId);
  
    // Update
    app.put("/resjammain/:resJamMainId", resJamMain.update);
  
    // Delete
    app.delete("/resjammain/delete", resJamMain.delete);
  
    // Delete all
    app.delete("/resjammain", resJamMain.deleteAll);
  };