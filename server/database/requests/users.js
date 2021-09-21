const { dataUsers } = require("../database");
// massage поменяй на message
const newUsers = (req, res) => {
  const { email, number, password } = req.body;
  const user = "user";
  dataUsers.insert({ email, number, password, user });
  res.status(201).json({ message: "AddUsers" });
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
    res.status(501).json({ message: "Email and Number NULL" });
  }

  const resTryLogIn = (err, docs) => {
    if (err === null) {
      if (docs !== null) {
        if (docs.password === password) {
          res.status(200).json({ message: "passwordAccepted", email: docs.email});
        } else {
          res.status(200).json({ message: "passwordNotAccepted" });
        }
      } else {
        res.status(200).json({ message: "UserNotAccepted" });
      }
    } else {
      res.status(500).json({ err });
    }
  };
};

const getUserPassword = (req, res) => {
  const { email, number } = req.params;

  if (email !== "null") {
    dataUsers.findOne({ email }, (err, docs) => {
      if (err === null) {
        res.status(200).json( docs.password );
      } else {
        res.status(500).json({ err });
      }
    });
  } else if (number !== "null") {
    dataUsers.findOne({ number }, (err, docs) => {
      if (err === null) {
        res.status(200).json(docs.password);
      } else {
        res.status(500).json({ err });
      }
    });
  } else {
    res.status(501).json({ message: "Email and Number NULL" });
  }
};

const getUserInfo = (req, res) => {
  const { email } = req.params;
  if (email !== "null") {
    dataUsers.findOne({ email }, (err, docs) => {
      if (err === null) {
        res.status(200).json({email: docs.email, number: docs.number, id: docs._id });
      } else {
        res.status(500).json({ err });
      }
    });
  } else {
    res.status(501).json({ message: "Email and Number NULL" });
  }
};

module.exports = {
  newUsers,
  tryLogIn,
  getUserInfo,
  getUserPassword,
};
