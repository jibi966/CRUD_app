const express = require("express");
const route = express.Router();
const userController = require("../controller/user.controller");
const axios = require("axios");
route.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/api/users");
    res.render("index", { users: response.data });
  } catch (err) {
    return res.send(err.message);
  }
});
route.get("/add-user", (req, res) => {
  res.render("add_user");
});
route.get("/update-user", async (req, res) => {
  try {
    const userToUpdate = await axios.get("http://localhost:3000/api/users", {
      params: { id: req.query.id },
    });
    res.render("update_user", { user: userToUpdate.data });
  } catch (err) {
    return res.send(err.message);
  }
});

//api
route.post("/api/users", userController.create);
route.get("/api/users", userController.find);
route.patch("/api/users/:id", userController.update);
route.delete("/api/users/:id", userController.delete);

module.exports = route;
