const Tglmain = require("../models/tglmain.model.js");

// Create and Save a new tanggal_main
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a tanggal_main
      const tanggal_main = new Tglmain({
        id_lapangan : req.body.id_lapangan,
        tanggal: req.body.tanggal
      });
    
      // Save tanggal_main in the database
      Tglmain.create(tanggal_main, (err, data) => {
        if (err){
          res.status(500).send({
            err_code: err.code,
            message:
              err.message || "Some error occurred while creating the tanggal_main."
          });
        }
        else res.send(data);
      });
};

// Retrieve all tanggal_mains from the database.
exports.findAll = (req, res) => {
    Tglmain.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tanggal_mains."
          });
        else res.send(data);
    });
};

exports.findByIdLap = (req, res) => {
  Tglmain.getByIdLapangan(req.params.id_lapangan,(err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tanggal_main."
        });
      else res.send(data);
  });
};

exports.findByDateAndIdLap = (req, res) => {
  Tglmain.getByDateAndIdLap(req.query.date,req.query.id_lapangan,(err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tanggal_main."
        });
      else res.send(data);
  });
  // console.log(req.query.date)
};

// Find a single tanggal_main with a tanggal_mainId
exports.findOne = (req, res) => {
    Tglmain.findById(req.params.tanggal_mainId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found tanggal_main with id ${req.params.tanggal_mainId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving tanggal_main with id " + req.params.tanggal_mainId
            });
          }
        } else res.send(data);
      });
};

// Update a tanggal_main identified by the tanggal_mainId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      console.log(req.body)

      const tanggal_main = new Tglmain({
        id_lapangan : req.body.id_lapangan,
        tanggal: req.body.tanggal
      });
    
      Tglmain.updateById(
        req.params.tanggal_mainId,
        tanggal_main,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found tanggal_main with id ${req.params.tanggal_mainId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating tanggal_main with id " + req.params.tanggal_mainId
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a tanggal_main with the specified tanggal_mainId in the request
exports.delete = (req, res) => {
    Tglmain.remove(req.params.tanggal_mainId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found tanggal_main with id ${req.params.tanggal_mainId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete tanggal_main with id " + req.params.tanggal_mainId
            });
          }
        } else res.send({ message: `tanggal_main was deleted successfully!` });
      });
};

// Delete all tanggal_mains from the database.
exports.deleteAll = (req, res) => {
    Tglmain.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tanggal_mains."
          });
        else res.send({ message: `All tanggal_mains were deleted successfully!` });
      });
};