const sql = require("./db.js");

// constructor
const Reservasi = function(reservasi) {
  this.id_pengguna = reservasi.id_pengguna;
  this.id_lapangan = reservasi.id_lapangan;
  this.tanggal_main = reservasi.tanggal_main;
  this.tanggal_dibuat = reservasi.tanggal_dibuat;
  this.total_pembayaran = reservasi.total_pembayaran;
  this.status_pembayaran = reservasi.status_pembayaran;
  this.status_reservasi = reservasi.status_reservasi;
};

Reservasi.create = (newreservasi, result) => {
  sql.query("INSERT INTO reservasi SET ?",
    newreservasi, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created reservasi: ", { id_reservasi: res.insertId, ...newreservasi });
    result(null, { id_reservasi: res.insertId, ...newreservasi });
  });
};

Reservasi.findById = (reservasiId, result) => {
  sql.query(`SELECT * FROM reservasi WHERE id_reservasi = ${reservasiId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      if(res[0].status_reservasi == 0){
        console.log("found reservasi: ", res[0]);
        result(null, res[0]);
        return;
      }
      else {
        result({ kind: "not_found" }, null);
        return;
      }
    }

    // not found reservasi with the id
    result({ kind: "not_found" }, null);
  });
};

Reservasi.findDetailReservationById = (reservasiId, result) => {
  sql.query(`SELECT * FROM reservasi INNER JOIN lapangan ON reservasi.id_lapangan = lapangan.id_lapangan INNER JOIN pengguna ON reservasi.id_pengguna = pengguna.id_pengguna WHERE reservasi.id_reservasi = ${reservasiId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found reservasi: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found reservasi with the id
    result({ kind: "not_found" }, null);
  });
};

Reservasi.getReservasiByIdPengguna = (userId, result) => {
  sql.query('SELECT * FROM reservasi WHERE reservasi.id_pengguna = ? ORDER BY reservasi.id_reservasi DESC', 
  [userId],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found reservasi: ", res);

      result(null, res);
      return;
    }

    // not found reservasi with the id
    result({ kind: "not_found" }, null);
  });
};

Reservasi.getAll = result => {
  sql.query("SELECT * from reservasi ORDER BY reservasi.tanggal_dibuat DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("reservasi: ", res);
    if(res.length){
      const data = res.filter(item => item.status_reservasi == 0)
      console.log(data);
      result(null, data);
      return;
    }

    // console.log("reservasi: ", res);
  });
};

Reservasi.filterByLapAndTglMain = (data, result) => {
  sql.query("SELECT * from reservasi WHERE reservasi.id_lapangan = ? AND reservasi.tanggal_main = ? ORDER BY reservasi.tanggal_dibuat DESC", 
  [data.id_lapangan, data.tanggal_main],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("reservasi: ", res);
    if(res.length){
      const data = res.filter(item => item.status_reservasi == 0)
      result(null, data);
      return;
    }
  });
};

Reservasi.updateById = (id_reservasi, reservasi, result) => {
  sql.query(
    "UPDATE reservasi SET `id_pengguna` = ?, `id_lapangan` = ?, `tanggal_main` = ?, `tanggal_dibuat` = ?, `total_pembayaran` = ?, `status_pembayaran` = ? WHERE id_reservasi = ?",
    [reservasi.id_pengguna, reservasi.id_lapangan, reservasi.tanggal_main, reservasi.tanggal_dibuat, reservasi.total_pembayaran, reservasi.status_pembayaran, id_reservasi],
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

      console.log("updated reservasi: ", { id_reservasi: id_reservasi, ...reservasi });
      result(null, { id_reservasi: id_reservasi, ...reservasi });
    }
  );
};

Reservasi.remove = (status_kode, id, result) => {
  sql.query("UPDATE reservasi SET status_reservasi = ? WHERE id_reservasi = ?", 
  [status_kode, id], 
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

    console.log("deleted reservasi with id: ", id);
    result(null, res);
  });
};

Reservasi.removeAll = result => {
  sql.query("DELETE FROM reservasi", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} reservasi`);
    result(null, res);
  });
};

module.exports = Reservasi;