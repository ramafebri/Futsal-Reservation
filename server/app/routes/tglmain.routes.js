module.exports = app => {
    const tglmain = require("../controllers/tglmain.controller.js");
  
    // Create a new tglmain
    app.post("/tglmain", tglmain.create);
  
    // Retrieve all tglmain
    app.get("/tglmain", tglmain.findAll);

    // Retrieve all tglmain
    app.get("/tglmain/lapangan/:id_lapangan", tglmain.findByIdLap);

    app.get("/tglmain/date/", tglmain.findByDateAndIdLap);
  
    // Retrieve a single tglmain with tglmainId
    app.get("/tglmain/:tanggal_mainId", tglmain.findOne);
  
    // Update a tglmain with tglmainId
    app.put("/tglmain/:tanggal_mainId", tglmain.update);
  
    // Delete a tglmain with tglmainId
    app.delete("/tglmain/:tanggal_mainId", tglmain.delete);
  
    // Delete all tglmain
    app.delete("/tglmain", tglmain.deleteAll);
  };