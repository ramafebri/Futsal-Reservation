const sql = require("./db.js");

// constructor
const ReservasiJamMain = function(reservasi) {
  this.id_reservasi = reservasi.id_reservasi;
  this.jam_main = reservasi.jam_main;
};

ReservasiJamMain.create = (newreservasi, result) => {
  sql.query("INSERT INTO reservasi_jam_main SET ?",
  [newreservasi] ,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created reservasi jam main: ", { newreservasi });
    result(null, { ...newreservasi });
  });
};

ReservasiJamMain.findById = (resJamMainId, result) => {
  sql.query(`SELECT * FROM reservasi_jam_main WHERE id_res_jam_main = ${resJamMainId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found reservasi jam main: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found reservasi with the id
    result({ kind: "not_found" }, null);
  });
};

ReservasiJamMain.filterByReservasiId = (reservasiId, result) => {
  sql.query(`SELECT * FROM reservasi_jam_main WHERE id_reservasi = ${reservasiId} ORDER BY jam_main ASC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found reservasi jam main: ", res);
      result(null, res);
      return;
    }

    // not found reservasi with the id
    result({ kind: "not_found" }, null);
  });
};

ReservasiJamMain.getAll = result => {
  sql.query("SELECT * FROM reservasi_jam_main ORDER BY jam_main ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("reservasi: ", res);
    result(null, res);
  });
};

ReservasiJamMain.updateById = (id_res_jam_main, reservasi, result) => {
  sql.query(
    "UPDATE reservasi_jam_main SET id_reservasi = ?, jam_main = ? WHERE id_res_jam_main = ?",
    [reservasi.id_reservasi, reservasi.jam_main, id_res_jam_main],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found reservasi with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated reservasi jam main: ", { id_res_jam_main: parseInt(id_res_jam_main), ...reservasi });
      result(null, { id_res_jam_main: parseInt(id_res_jam_main), ...reservasi });
    }
  );
};

ReservasiJamMain.remove = (id, jam_main, result) => {
  sql.query("DELETE FROM reservasi_jam_main WHERE id_reservasi = ? AND jam_main = ?", 
  [id, jam_main], 
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found reservasi with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted reservasi jam main with id: ", id);
    result(null, res);
  });
};

ReservasiJamMain.removeAll = result => {
  sql.query("DELETE FROM reservasi_jam_main", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} reservasi jam main`);
    result(null, res);
  });
};

module.exports = ReservasiJamMain;