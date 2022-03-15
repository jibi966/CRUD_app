const User = require("../models/user.model");

// create and save new user

exports.create = async (req, res) => {
  try {
    // validate req
    if (!req.body) {
      return res.status(400).send({ message: "Content can not be empty" });
    }

    //creating new users
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      status: req.body.status,
    });
    return res.redirect("/");
  } catch (e) {
    return res
      .status(500)
      .send({ message: e.message || "some error at creation" });
  }
};

// retrive and return single/all user

exports.find = async (req, res) => {
  try {
    if (req.query.id) {
      const user = await User.findById(req.query.id).lean().exec();
      if (user) {
        return res.status(201).send(user);
      } else {
        return res.status(404).send({ message: "user not found" });
      }
    } else {
      const users = await User.find().lean().exec();
      return res.send(users);
    }
  } catch (e) {
    return res
      .status(500)
      .send({ message: e.message || "some error at creation" });
  }
};

// update single user

exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Content can not be empty" });
    }

    let user = await User.findOne({ id: req.params.id }).lean().exec();
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    } else {
      user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(201).send(user);
    }
  } catch (e) {
    return res
      .status(500)
      .send({ message: e.message || "some error at creation" });
  }
};

// delete single user

exports.delete = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.send(`${user.name} deleted successfully`);
  } catch (e) {
    return res
      .status(500)
      .send({ message: e.message || "some error at deletion" });
  }
};
