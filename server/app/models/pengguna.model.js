const sql = require("./db.js");

// constructor
const Pengguna = function(pengguna) {
  this.nama_pengguna = pengguna.nama_pengguna;
  this.no_telp_pengguna = pengguna.no_telp_pengguna;
  this.password = pengguna.password;
  this.status_pengguna = pengguna.status_pengguna;
};

Pengguna.create = (newUser, result) => {
  sql.query("INSERT INTO pengguna SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id_pengguna: res.insertId, ...newUser });

    const data = {
      id_pengguna: res.insertId,
      nama_pengguna: newUser.nama_pengguna,
      no_telp_pengguna: newUser.no_telp_pengguna,
      status_pengguna: newUser.status_pengguna,
    }
    result(null, data);
  });
};

Pengguna.findById = (userId, result) => {
  sql.query(`SELECT * FROM pengguna WHERE id_pengguna = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      if(res[0].status_pengguna == 0){
        console.log("found user: ", res[0]);
        const data = {
          id_pengguna: res[0].id_pengguna,
          nama_pengguna: res[0].nama_pengguna,
          no_telp_pengguna: res[0].no_telp_pengguna,
          status_pengguna: res[0].status_pengguna,
        }
        result(null, data);
        return;
      }
      else {
        result({ kind: "not_found" }, null);
        return;
      }
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Pengguna.findByName = (nama_pengguna, result) => {
  sql.query(`SELECT * FROM pengguna WHERE nama_pengguna LIKE '%${nama_pengguna}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res);
      const data = res.filter(item => item.status_pengguna == 0);
      result(null, data);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Pengguna.getAll = result => {
  sql.query("SELECT * FROM pengguna", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if(res.length){
      const data = res.filter(item => item.status_pengguna == 0)
      result(null, data);
      return;
    }

    // console.log("user: ", res);
  });
};

Pengguna.login = (user, result) => {
  sql.query("SELECT * FROM pengguna WHERE no_telp_pengguna = ? AND password = ?", 
    [user.no_telp_pengguna, user.password],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.length) {
        if(res[0].status_pengguna == 0){
          console.log("found user: ", res[0]);
          const data = {
            id_pengguna: res[0].id_pengguna,
            nama_pengguna: res[0].nama_pengguna,
            no_telp_pengguna: res[0].no_telp_pengguna,
            status_pengguna: res[0].status_pengguna,
          }
          result(null, data);
          return;
        }
        else {
          result({ kind: "not_found" }, null);
          return;
        }
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
  });
};

Pengguna.loginAdmin = (user, result) => {
  sql.query("SELECT * FROM pengguna WHERE nama_pengguna = ? AND password = ?", 
    [user.nama_pengguna, user.password],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.length) {
        if(res[0].terhapus == 0){
          console.log("found user: ", res[0]);
          const data = {
            id_pengguna: res[0].id_pengguna,
            nama_pengguna: res[0].nama_pengguna,
            no_telp_pengguna: res[0].no_telp_pengguna,
            status_pengguna: res[0].status_pengguna,
          }
          result(null, data);
          return;
        }
        else {
          result({ kind: "not_found" }, null);
          return;
        }
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
  });
};

Pengguna.updateById = (id_pengguna, user, result) => {
  sql.query(
    "UPDATE pengguna SET nama_pengguna = ?, no_telp_pengguna = ?, password = ? WHERE id_pengguna = ?",
    [user.nama_pengguna, user.no_telp_pengguna, user.password, id_pengguna],
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

      console.log("updated user: ", { id_pengguna: id_pengguna, ...user });
      const data = {
        id_pengguna: parseInt(id_pengguna),
        nama_pengguna: user.nama_pengguna,
        no_telp_pengguna: user.no_telp_pengguna,
        status_pengguna: user.status_pengguna
      }
      result(null, data);
    }
  );
};

Pengguna.remove = (status_kode, id, result) => {
  sql.query("UPDATE pengguna SET status_pengguna = ? WHERE id_pengguna = ?", [status_kode, id], (err, res) => {
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

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

Pengguna.removeAll = result => {
  sql.query("DELETE FROM pengguna", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user`);
    result(null, res);
  });
};

module.exports = Pengguna;