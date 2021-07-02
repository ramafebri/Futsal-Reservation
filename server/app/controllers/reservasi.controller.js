const Reservasi = require("../models/reservasi.model.js");

// Create and Save a new reservasi
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a reservasi
      const reservasi = new Reservasi({
        id_pengguna: req.body.id_pengguna,
        id_lapangan: req.body.id_lapangan,
        id_jam_main: req.body.id_jam_main,
        tanggal_main: req.body.tanggal_main,
        tanggal_dibuat: req.body.tanggal_dibuat,
        jam_main: req.body.jam_main,
        total_pembayaran: req.body.total_pembayaran,
        status_pembayaran: req.body.status_pembayaran,
        status_reservasi: 0
      });
    
      // Save reservasi in the database
      Reservasi.create(reservasi, (err, data) => {
        if (err){
          res.status(500).send({
            err_code: err.code,
            message:
              err.message || "Some error occurred while creating the reservasi."
          });
        }
        else res.send(data);
      });
};

// Retrieve all reservasis from the database.
exports.findAll = (req, res) => {
    Reservasi.getAll((err, data) => {
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
    Reservasi.findById(req.params.reservasiId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found reservasi with id ${req.params.reservasiId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving reservasi with id " + req.params.reservasiId
            });
          }
        } else res.send(data);
      });
};

exports.findDetail = (req, res) => {
  Reservasi.findDetailReservationById(req.params.reservasiId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found reservasi with id ${req.params.reservasiId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving reservasi with id " + req.params.reservasiId
          });
        }
      } else res.send(data);
    });
};

exports.getReservasiByIdPengguna = (req, res) => {
  Reservasi.getReservasiByIdPengguna(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found reservasi with id pengguna ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving reservasi with id pengguna " + req.params.userId
          });
        }
      } else res.send(data);
    });
};

exports.getReservasiByIdLapAndTglMain = (req, res) => {
  const datas = {
    tanggal_main: req.query.tanggal_main,
    id_lapangan: req.query.id_lapangan
  }

  Reservasi.filterByLapAndTglMain(datas, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found reservasi with id lapangan ${req.body.id_lapangan}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving reservasi with id lapangan " + req.body.id_lapangan
          });
        }
      } else res.send(data);
    });
};

// Update a reservasi identified by the reservasiId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      const reservasi = new Reservasi({
        id_pengguna: req.body.id_pengguna,
        id_lapangan: req.body.id_lapangan,
        id_jam_main: req.body.id_jam_main,
        tanggal_main: req.body.tanggal_main,
        tanggal_dibuat: req.body.tanggal_dibuat,
        jam_main: req.body.jam_main,
        total_pembayaran: req.body.total_pembayaran,
        status_pembayaran: req.body.status_pembayaran,
        status_reservasi: 0
      });
    
      Reservasi.updateById(
        req.params.reservasiId,
        reservasi,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found reservasi with id ${req.params.reservasiId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating reservasi with id " + req.params.reservasiId
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a reservasi with the specified reservasiId in the request
exports.delete = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
    Reservasi.remove(req.body.status_reservasi, req.params.reservasiId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found reservasi with id ${req.params.reservasiId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete reservasi with id " + req.params.reservasiId
            });
          }
        } else res.send({ message: `reservasi was deleted successfully!` });
      });
};

// Delete all reservasis from the database.
exports.deleteAll = (req, res) => {
    Reservasi.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all reservasis."
          });
        else res.send({ message: `All reservasis were deleted successfully!` });
      });
};