const { dataUsers } = require("../database");

const newUsers = (req, res) => {
  const { email, number, password } = req.body;
  const user = "user";
  dataUsers.insert({ email, number, password, user });
  res.status(201).json({ message: "AddUsers" });
};

const getUsersNumber = (req, res) => {
  const { number } = req.params;
  dataUsers.findOne({ number }, (err, docs) => {
    if (err === null) {
      res.status(200).json({ docs });
    } else {
      res.status(500).json({ err });
    }
  });
};
const getUsersEmail = (req, res) => {
  const { email, password } = req.params;
  dataUsers.findOne({ email }, (err, docs) => {
    if (err === null) {
      if (docs !== null) {
        if (docs.password === password) {
          res.status(200).json({ massage: "passwordAccepted" });
        } else {
          res.status(200).json({ massage: "passwordNotAccepted" });
        }
      } else {
        res.status(200).json({ massage: "emailNotAccepted" });
      }
    } else {
      res.status(500).json({ err });
    }
  });
};
const getUsersPasswordEmail = (req, res) => {
  const { email } = req.params;
  dataUsers.findOne({ email }, (err, docs) => {
    if (err === null) {
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
