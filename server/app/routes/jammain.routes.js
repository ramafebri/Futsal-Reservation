module.exports = app => {
    const jammain = require("../controllers/jammain.controller.js");
  
    // Create a new jammain
    app.post("/jammain", jammain.create);
  
    // Retrieve all jammain
    app.get("/jammain", jammain.findAll);

    app.get("/jammain/:jam_mainId", jammain.findOne);

    app.get("/jammain/filter/filter", jammain.findByIdLapTgl);
  
    // Update a jammain with jammainId
    app.put("/jammain/:jam_mainId", jammain.updateJamMain);

    app.put("/jammain/booking/:jam_mainId", jammain.updateBooking);
  
    // Delete a jammain with jammainId
    app.delete("/jammain/:jam_mainId", jammain.delete);
  
    // Delete all jammain
    app.delete("/jammain", jammain.deleteAll);
  };