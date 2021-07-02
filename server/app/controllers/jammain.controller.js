const JamMain = require("../models/jammain.model.js");

// Create and Save a new jam main
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a jam main
      const jam_main = new JamMain({
        id_lapangan : req.body.id_lapangan,
        tanggal: req.body.tanggal,
        jam: req.body.jam,
        terpesan: req.body.terpesan,
        biaya_reservasi: req.body.biaya_reservasi,
      });
    
      // Save jam main in the database
      JamMain.create(jam_main, (err, data) => {
        if (err){
          res.status(500).send({
            err_code: err.code,
            message:
              err.message || "Some error occurred while creating the jam main."
          });
        }
        else res.send(data);
      });
};

// Retrieve all jam mains from the database.
exports.findAll = (req, res) => {
    JamMain.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving jam mains."
          });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
  JamMain.findById(req.params.jam_mainId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found jam main with id ${req.params.jam_mainId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving jam main with id " + req.params.jam_mainId
          });
        }
      } else res.send(data);
    });
};

// Find a single jam main with a jam mainId
exports.findByIdLapTgl = (req, res) => {
    const datas = {
      id_lapangan: req.query.id_lapangan,
      tanggal: req.query.tanggal
    }
    JamMain.findByIdLapTgl(datas, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found jam main with tanggal ${req.body.tanggal}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving jam main with tanggal " + req.body.tanggal
            });
          }
        } else res.send(data);
      });
};

// Update a jam main identified by the jam mainId in the request
exports.updateJamMain = (req, res) => {
  // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const jam_main = new JamMain({
      id_lapangan : req.body.id_lapangan,
      tanggal: req.body.tanggal,
      jam: req.body.jam,
      terpesan: req.body.terpesan,
      biaya_reservasi: req.body.biaya_reservasi,
    });
  
    JamMain.updateById(
      req.params.jam_mainId,
      jam_main,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found jam main with id ${req.params.jam_mainId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating jam main with id " + req.params.jam_mainId
            });
          }
        } else res.send(data);
      }
    );
};

exports.updateBooking = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      JamMain.updateBookingById(
        req.params.jam_mainId,
        new JamMain(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found jam main with id ${req.params.jam_mainId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating jam main with id " + req.params.jam_mainId
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a jam main with the specified jam mainId in the request
exports.delete = (req, res) => {
    JamMain.remove(req.params.jam_mainId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found jam main with id ${req.params.jam_mainId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete jam main with id " + req.params.jam_mainId
            });
          }
        } else res.send({ message: `jam main was deleted successfully!` });
      });
};

// Delete all jam mains from the database.
exports.deleteAll = (req, res) => {
    JamMain.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all jam mains."
          });
        else res.send({ message: `All jam mains were deleted successfully!` });
      });
};