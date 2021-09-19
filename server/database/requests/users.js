const { dataUsers } = require("../database");
let bodyParser = require("body-parser");


const newUsers = (req, res) => {
  const { email, number, password } = req.body;
  const user = "user";
  dataUsers.insert({ email, number, password, user });
  res.status(201).json({ message: "AddUsers" });
};

const getUsersNumber = (req, res) => {
  dataUsers.findOne({ number: req.body.number }, (err, docs) => {
    if (err === null) {
      res.status(200).json({ docs });
    } else {
      res.status(500).json({ err });
    }
  });
};
const getUsersEmail = (req, res) => {
  dataUsers.findOne({ email: req.body.email }, (err, docs) => {
    if (err === null) {
      res.status(200).json({ docs });
    } else {
      res.status(500).json({ err });
    }
  });
};
const getUsersPasswordEmail = async (req, res) => {
  dataUsers.findOne({ email: req.body.email }, (err, docs) => {
    if (err === null) {
      console.log(req.body);
      res.status(200).json({ docs });
    } else {
      res.status(500).json({ err });
    }
  });
};
const getUsersPasswordNumber = (req, res) => {
  const a = req.body.number;
  dataUsers.findOne({ number: a }, (err, docs) => {
    if (err === null) {
      res.status(200).json({ docs });
    } else {
      res.status(500).json({ err });
    }
  });
};

module.exports = {
  newUsers,
  getUsersNumber,
  getUsersEmail,
  getUsersPasswordEmail,
  getUsersPasswordNumber,
};
