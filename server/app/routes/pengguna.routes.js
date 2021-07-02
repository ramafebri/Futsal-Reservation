module.exports = app => {
    const users = require("../controllers/pengguna.controller.js");
  
    // Create a new User
    app.post("/users", users.create);
  
    // Retrieve all User
    app.get("/users", users.findAll);

    // Retrieve login
    app.post("/users/login", users.login);

    app.post("/users/admin/login", users.loginAdmin);
  
    // Retrieve a single User with userId
    app.get("/users/:userId", users.findOne);

    app.get("/users/filter/filter", users.findOneByName);
  
    // Update a User with userId
    app.put("/users/:userId", users.update);
  
    // Delete a User with userId
    app.put("/users/delete/:userId", users.delete);
  
    // Delete all Users
    app.delete("/users", users.deleteAll);
  };