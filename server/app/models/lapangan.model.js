const sql = require("./db.js");

// constructor
const Lapangan = function(lapangan) {
  this.nama_lapangan = lapangan.nama_lapangan;
  this.gambar_lapangan = lapangan.gambar_lapangan;
  this.jenis_lapangan = lapangan.jenis_lapangan;
  this.status_lapangan = lapangan.status_lapangan;
};

Lapangan.create = (newLapangan, result) => {
  sql.query("INSERT INTO lapangan SET ?", newLapangan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created lapangan: ", { id_lapangan: res.insertId, ...newLapangan });
    result(null, { id_lapangan: res.insertId, ...newLapangan });
  });
};

Lapangan.findById = (lapanganId, result) => {
  sql.query(`SELECT * FROM lapangan WHERE id_lapangan = ${lapanganId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      if(res[0].status_lapangan == 0){
        console.log("found lapangan: ", res[0]);
        result(null, res[0]);
        return;
      }
      else {
        result({ kind: "not_found" }, null);
        return;
      }
    }

    // not found lapangan with the id
    result({ kind: "not_found" }, null);
  });
};

Lapangan.getAll = result => {
  sql.query("SELECT * FROM lapangan", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if(res.length){
      const data = res.filter(item => item.status_lapangan == 0)
      result(null, data);
      return;
    }

    // console.log("lapangan: ", res);
  });
};

Lapangan.updateById = (id_lapangan, lapangan, result) => {
  sql.query(
    "UPDATE lapangan SET nama_lapangan = ?, gambar_lapangan = ?, jenis_lapangan = ? WHERE id_lapangan = ?",
    [lapangan.nama_lapangan, lapangan.gambar_lapangan, lapangan.jenis_lapangan, id_lapangan],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found lapangan with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated lapangan: ", { id_lapangan: id_lapangan, ...lapangan });
      result(null, { id_lapangan: id_lapangan, ...lapangan });
    }
  );
};

Lapangan.remove = (status_kode, id, result) => {
  sql.query("UPDATE lapangan SET status_lapangan = ? WHERE id_lapangan = ?", 
  [status_kode, id], 
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found lapangan with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted lapangan with id: ", id);
    result(null, res);
  });
};

Lapangan.removeAll = result => {
  sql.query("DELETE FROM lapangan", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} lapangan`);
    result(null, res);
  });
};

module.exports = Lapangan;