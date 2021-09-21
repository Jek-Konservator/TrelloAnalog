const { dataUsers } = require("../database");
// massage поменяй на message
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

const tryLogIn = (req, res) => {
  const { email, number, password } = req.params;

  if (email !== "null") {
    dataUsers.findOne({ email }, (err, docs) => {
      resTryLogIn(err, docs);
    });
  } else if (number !== "null") {
    dataUsers.findOne({ number }, (err, docs) => {
      resTryLogIn(err, docs);
    });
  } else {
    res.status(501).json({ massage: "Email and Number NULL" });
  }

  const resTryLogIn = (err, docs) => {
    if (err === null) {
      if (docs !== null) {
        if (docs.password === password) {
          const id = docs._id;
          res.status(200).json({ massage: "passwordAccepted", id });
        } else {
          res.status(200).json({ massage: "passwordNotAccepted" });
        }
      } else {
        res.status(200).json({ massage: "UserNotAccepted" });
      }
    } else {
      res.status(500).json({ err });
    }
  };
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
  tryLogIn,
  getUsersPasswordEmail,
  getUsersPasswordNumber,
};
