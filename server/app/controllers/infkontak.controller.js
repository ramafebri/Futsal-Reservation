const Info = require("../models/infkontak.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a user
    const info = new Info({
      no_telp_informasi: req.body.no_telp_informasi,
      nama_informasi: req.body.nama_informasi,
      logo: req.body.logo,
      alamat: req.body.alamat
    });
  
    // Save user in the database
    Info.create(info, (err, data) => {
      if (err){
        res.status(500).send({
          err_code: err.code,
          message:
            err.message || "Some error occurred while creating the kontak."
        });
      }
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Info.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving info kontak."
          });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
  Info.findById(req.params.kontakId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found kontak with id ${req.params.kontakId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving kontak with id " + req.params.kontakId
          });
        }
      } else res.send(data);
    });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const info = new Info({
      no_telp_informasi: req.body.no_telp_informasi,
      nama_informasi: req.body.nama_informasi,
      logo: req.body.logo,
      alamat: req.body.alamat
    });
  
    Info.updateById(
      req.params.kontakId,
      info,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found kontak with id ${req.params.kontakId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating kontak with id " + req.params.kontakId
            });
          }
        } else res.send(data);
      }
    );
};

exports.delete = (req, res) => {
  Info.remove(req.params.kontakId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found kontak with id ${req.params.kontakId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete kontak with id " + req.params.kontakId
          });
        }
      } else res.send({ message: `kontak was deleted successfully!` });
    });
};