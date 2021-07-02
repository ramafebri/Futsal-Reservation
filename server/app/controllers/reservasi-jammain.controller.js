const ReservasiJamMain = require("../models/reservasi-jammain.model.js");

// Create and Save
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      const reservasiJamMain = new ReservasiJamMain({
        id_reservasi: req.body.id_reservasi,
        jam_main: req.body.jam_main,
      });

      ReservasiJamMain.create(reservasiJamMain, (err, data) => {
        if (err){
          res.status(500).send({
            err_code: err.code,
            message:
              err.message || "Some error occurred while creating the reservasi jam main."
          });
        }
        else res.send(data);
      });
};

// Retrieve all reservasis from the database.
exports.findAll = (req, res) => {
    ReservasiJamMain.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving reservasis."
          });
        else res.send(data);
    });
};

// Find a single reservasi with a reservasiId
exports.findOne = (req, res) => {
    ReservasiJamMain.findById(req.params.resJamMainId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found reservasi jam main with id ${req.params.resJamMainId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving reservasi jam main with id " + req.params.resJamMainId
            });
          }
        } else res.send(data);
      });
};

exports.findByReservasiId = (req, res) => {
  ReservasiJamMain.filterByReservasiId(req.params.reservasiId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found reservasi jam main with res id ${req.params.reservasiId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving reservasi jam main with res id " + req.params.reservasiId
          });
        }
      } else res.send(data);
    });
};

// Update
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      const reservasiJamMain = new ReservasiJamMain({
        id_reservasi: req.body.id_reservasi,
        jam_main: req.body.jam_main,
      });
    
      ReservasiJamMain.updateById(
        req.params.resJamMainId,
        reservasiJamMain,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found reservasi jam main with id ${req.params.resJamMainId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating reservasi jam main with id " + req.params.resJamMainId
              });
            }
          } else res.send(data);
        }
      );
};

// Delete
exports.delete = (req, res) => {
    ReservasiJamMain.remove(req.query.id_reservasi, req.query.jam_main, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found reservasi jam main with id ${req.params.resJamMainId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete reservasi jam main with id " + req.params.resJamMainId
            });
          }
        } else res.send({ message: `reservasi jam main was deleted successfully!` });
      });
};

// Delete all reservasis from the database.
exports.deleteAll = (req, res) => {
    ReservasiJamMain.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all reservasi jam main."
          });
        else res.send({ message: `All reservasis jam main were deleted successfully!` });
      });
};