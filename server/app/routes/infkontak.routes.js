module.exports = app => {
    const info = require("../controllers/infkontak.controller.js");
  
        // Create a new kontak
        app.post("/info", info.create);

        // Retrieve all infor kontak
        app.get("/info", info.findAll);

        app.get("/info/:kontakId", info.findOne);

        // Update a kontak with kontakId
        app.put("/info/:kontakId", info.update);
  
        // Delete a kontak with kontakId
        app.delete("/info/:kontakId", info.delete);
  
  };