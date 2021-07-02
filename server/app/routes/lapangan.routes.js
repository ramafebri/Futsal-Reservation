module.exports = app => {
    const lapangan = require("../controllers/lapangan.controller.js");
  
    // Create a new lapangan
    app.post("/lapangan", lapangan.create);
  
    // Retrieve all lapangan
    app.get("/lapangan", lapangan.findAll);
  
    // Retrieve a single lapangan with lapanganId
    app.get("/lapangan/:lapanganId", lapangan.findOne);
  
    // Update a lapangan with lapanganId
    app.put("/lapangan/:lapanganId", lapangan.update);
  
    // Delete a lapangan with lapanganId
    app.put("/lapangan/delete/:lapanganId", lapangan.delete);
  
    // Delete all lapangan
    app.delete("/lapangan", lapangan.deleteAll);
  };