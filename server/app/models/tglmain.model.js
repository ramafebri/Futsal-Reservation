const sql = require("./db.js");

// constructor
const Tglmain = function(tglmain) {
  this.id_lapangan = tglmain.id_lapangan;
  this.tanggal = tglmain.tanggal;
};

Tglmain.create = (newtanggal_main, result) => {
  sql.query("INSERT INTO tanggal_main SET ?", newtanggal_main, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created tanggal_main: ", { id_tanggal_main: res.insertId, ...newtanggal_main });
    result(null, { id_tanggal_main: res.insertId, ...newtanggal_main });
  });
};

Tglmain.findById = (tanggal_mainId, result) => {
  sql.query(`SELECT * FROM tanggal_main WHERE id_tanggal_main = ${tanggal_mainId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tanggal_main: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found tanggal_main with the id
    result({ kind: "not_found" }, null);
  });
};

Tglmain.getAll = result => {
  sql.query("SELECT * FROM tanggal_main ORDER BY tanggal_main.tanggal DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tanggal_main: ", res);
    result(null, res);
  });
};

Tglmain.getByIdLapangan = (id_lapangan, result) => {
  sql.query("SELECT * FROM tanggal_main WHERE id_lapangan = ? ORDER BY tanggal ASC", 
  [id_lapangan],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tanggal_main: ", res);
    result(null, res);
  });
};

Tglmain.getByDateAndIdLap = (date, idLap, result) => {
  sql.query("SELECT * FROM tanggal_main WHERE tanggal = ? AND id_lapangan = ?", 
  [date, idLap],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tanggal_main: ", res);
    result(null, res);
  });
};

Tglmain.updateById = (id_tanggal_main, tanggal_main, result) => {
  sql.query(
    "UPDATE tanggal_main SET id_lapangan = ?, tanggal = ? WHERE id_tanggal_main = ?",
    [tanggal_main.id_lapangan, tanggal_main.tanggal, id_tanggal_main],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found tanggal_main with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tanggal_main: ", { id_tanggal_main: id_tanggal_main, ...tanggal_main });
      result(null, { id_tanggal_main: id_tanggal_main, ...tanggal_main });
    }
  );
};

Tglmain.remove = (id, result) => {
  sql.query("DELETE FROM tanggal_main WHERE id_tanggal_main = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found tanggal_main with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tanggal_main with id: ", id);
    result(null, res);
  });
};

Tglmain.removeAll = result => {
  sql.query("DELETE FROM tanggal_main", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tanggal_main`);
    result(null, res);
  });
};

module.exports = Tglmain;