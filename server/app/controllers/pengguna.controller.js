const User = require("../models/pengguna.model.js");
const md5 = require('md5');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a user
      const user = new User({
        nama_pengguna: req.body.nama_pengguna,
        no_telp_pengguna: req.body.no_telp_pengguna,
        password: md5(req.body.password),
        status_pengguna: 0
      });
    
      // Save user in the database
      User.create(user, (err, data) => {
        if (err){
          res.status(500).send({
            err_code: err.code,
            message:
              err.message || "Some error occurred while creating the user."
          });
        }
        else res.send(data);
      });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.send(data);
    });
};

// Find a single user with data
exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a user
    const user = new User({
      nama_pengguna: '',
      no_telp_pengguna: req.body.no_telp_pengguna,
      password: md5(req.body.password),
      status_pengguna: 0
    });

    User.login(user, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving user with notelp " + req.body.no_telp
            });
          }
        } else res.send(data);
      });
};

exports.loginAdmin = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a user
  const user = new User({
    nama_pengguna: req.body.username,
    no_telp_pengguna: '',
    password: md5(req.body.password),
    status_pengguna: 0
  });

  User.loginAdmin(user, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user with username " + req.body.username
          });
        }
      } else res.send(data);
    });
};

// Find a single user with a data
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
          });
        }
      } else res.send(data);
    });
};

exports.findOneByName = (req, res) => {
  User.findByName(req.query.name, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with name ${req.query.name}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user with name " + req.query.name
          });
        }
      } else res.send(data);
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      const user = new User({
        nama_pengguna: req.body.nama_pengguna,
        no_telp_pengguna: req.body.no_telp_pengguna,
        password: md5(req.body.password),
        status_pengguna: 0
      });
    
      User.updateById(
        req.params.userId,
        user,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found user with id ${req.params.userId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating user with id " + req.params.userId
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
    User.remove(req.body.status_pengguna, req.params.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete user with id " + req.params.userId
            });
          }
        } else res.send({ message: `user was deleted successfully!` });
      });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        else res.send({ message: `All users were deleted successfully!` });
      });
};