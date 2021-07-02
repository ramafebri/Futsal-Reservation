const Lapangan = require("../models/lapangan.model.js");

// Create and Save a new lapangan
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a lapangan
      const lapangan = new Lapangan({
        nama_lapangan: req.body.nama_lapangan,
        gambar_lapangan: req.body.gambar_lapangan,
        jenis_lapangan: req.body.jenis_lapangan,
        status_lapangan: 0
      });
    
      // Save lapangan in the database
      Lapangan.create(lapangan, (err, data) => {
        if (err){
          res.status(500).send({
            err_code: err.code,
            message:
              err.message || "Some error occurred while creating the lapangan."
          });
        }
        else res.send(data);
      });
};

// Retrieve all lapangans from the database.
exports.findAll = (req, res) => {
    Lapangan.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving lapangans."
          });
        else res.send(data);
    });
};

// Find a single lapangan with a lapanganId
exports.findOne = (req, res) => {
    Lapangan.findById(req.params.lapanganId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found lapangan with id ${req.params.lapanganId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving lapangan with id " + req.params.lapanganId
            });
          }
        } else res.send(data);
      });
};

// Update a lapangan identified by the lapanganId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      const lapangan =  new Lapangan({
        nama_lapangan: req.body.nama_lapangan,
        gambar_lapangan: req.body.gambar_lapangan,
        jenis_lapangan: req.body.jenis_lapangan,
        status_lapangan: 0
      })
    
      Lapangan.updateById(
        req.params.lapanganId,
        lapangan,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found lapangan with id ${req.params.lapanganId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating lapangan with id " + req.params.lapanganId
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a lapangan with the specified lapanganId in the request
exports.delete = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

    Lapangan.remove(req.body.status_lapangan, req.params.lapanganId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found lapangan with id ${req.params.lapanganId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete lapangan with id " + req.params.lapanganId
            });
          }
        } else res.send({ message: `lapangan was deleted successfully!` });
      });
};

// Delete all lapangans from the database.
exports.deleteAll = (req, res) => {
    Lapangan.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all lapangans."
          });
        else res.send({ message: `All lapangans were deleted successfully!` });
      });
};