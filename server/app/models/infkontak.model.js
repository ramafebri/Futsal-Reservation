const sql = require("./db.js");

// constructor
const Info = function(Info) {
  this.no_telp_informasi = Info.no_telp_informasi;
  this.nama_informasi = Info.nama_informasi;
  this.logo = Info.logo;
  this.alamat = Info.alamat;
};

Info.create = (newKontak, result) => {
  sql.query("INSERT INTO informasi_kontak SET ?", newKontak, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id_pengguna: res.insertId, ...newKontak });
    result(null, res);
  });
};

  Info.getAll = result => {
    sql.query("SELECT * FROM informasi_kontak", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("informasi: ", res);
      result(null, res);
    });
  };

  Info.findById = (id, result) => {
    sql.query(`SELECT * FROM informasi_kontak WHERE id_informasi = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found informasi kontak: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  Info.updateById = (id, kontak, result) => {
    sql.query(
      "UPDATE informasi_kontak SET nama_informasi = ?, no_telp_informasi = ?, logo = ?, alamat = ? WHERE id_informasi = ?",
      [kontak.nama_informasi, kontak.no_telp_informasi, kontak.logo, kontak.alamat, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found user with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated kontak: ", { id: id, ...kontak });
        result(null, res);
      }
    );
  };
  
  Info.remove = (id, result) => {
    sql.query("DELETE FROM informasi_kontak WHERE id_informasi = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted kontak with id: ", id);
      result(null, res);
    });
  };

module.exports = Info;