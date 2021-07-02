const sql = require("./db.js");

// constructor
const JamMain = function(jammain) {
  this.id_lapangan = jammain.id_lapangan;
  this.tanggal = jammain.tanggal;
  this.jam = jammain.jam;
  this.terpesan = jammain.terpesan;
  this.biaya_reservasi = jammain.biaya_reservasi;
};

JamMain.create = (newjam_main, result) => {
  sql.query("INSERT INTO jam_main SET ?", newjam_main, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created jam_main: ", { id_tanggal_main: res.insertId, ...newjam_main });
    result(null, { id_tanggal_main: res.insertId, ...newjam_main });
  });
};

JamMain.findByIdLapTgl = (data, result) => {
  sql.query(`SELECT * FROM jam_main WHERE id_lapangan = ? AND tanggal = ? ORDER BY jam ASC`, 
  [data.id_lapangan, data.tanggal],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found jam_main: ", res);
      result(null, res);
      return;
    }

    // not found jam_main with the id
    result({ kind: "not_found" }, null);
  });
};

JamMain.getAll = result => {
  sql.query("SELECT * FROM jam_main ORDER BY id_jam_main DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("jam_main: ", res);
    result(null, res);
  });
};

JamMain.findById = (id, result) => {
  sql.query(`SELECT * FROM jam_main WHERE id_jam_main = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found jam main: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

JamMain.updateById = (id_jam_main, jam_main, result) => {
  sql.query(
    "UPDATE jam_main SET id_lapangan = ?, tanggal = ?, jam = ?, terpesan = ?, biaya_reservasi = ? WHERE id_jam_main = ?",
    [jam_main.id_lapangan, jam_main.tanggal, jam_main.jam, jam_main.terpesan, jam_main.biaya_reservasi, id_jam_main],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found jam_main with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated jam_main: ", { id_tanggal_main: id_jam_main, ...jam_main });
      result(null, { id_tanggal_main: id_jam_main, ...jam_main });
    }
  );
};

JamMain.updateBookingById = (id_jam_main, jam_main, result) => {
  sql.query(
    "UPDATE jam_main SET terpesan = ? WHERE id_jam_main = ?",
    [jam_main.terpesan, id_jam_main],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found jam_main with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated jam_main: ", { id_jam_main: id_jam_main, ...jam_main });
      result(null, { id_jam_main: id_jam_main, ...jam_main });
    }
  );
};

JamMain.remove = (id, result) => {
  sql.query("DELETE FROM jam_main WHERE id_jam_main = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found jam_main with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted jam_main with id: ", id);
    result(null, res);
  });
};

JamMain.removeAll = result => {
  sql.query("DELETE FROM jam_main", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} jam_main`);
    result(null, res);
  });
};

module.exports = JamMain;