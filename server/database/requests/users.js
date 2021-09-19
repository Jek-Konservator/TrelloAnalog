const { dataUsers } = require("../database");

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
const getUsersPasswordEmail = (req, res) => {
  const { email } = req.params;
  dataUsers.findOne({ email }, (err, docs) => {
    if (err === null) {
      console.log(req.body);
      res.status(200).json({ docs });
    } else {
      res.status(500).json({ err });
    }
  });
};
const getUsersPasswordNumber = (req, res) => {
  const { number } = req.params;
  dataUsers.findOne({ number }, (err, docs) => {
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

// TODO: деструктуризация переменных