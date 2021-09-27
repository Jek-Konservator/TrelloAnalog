const { dataUsers, dataBoard } = require("../database");

const newUsers = (req, res) => {
  const { email, number, password } = req.body;

  dataUsers.findOne({ email }, (err, docs) => {
    if (docs !== null) {
      return res.status(200).json({ message: "emailUsed" });
    } else {
      dataUsers.findOne({ number }, (err, docs) => {
        if (docs !== null) {
          return res.status(200).json({ message: "numberUsed" });
        } else {
          dataUsers.insert({
            email,
            number,
            password,
            role: "user",
          });
          res.status(201).json({ message: "AddUsers" });
        }
      });
    }
  });
};

const tryLogIn = (req, res) => {
  const { email, number, password } = req.params;

  if (email !== "null") {
    dataUsers.findOne({ email }, (err, docs) => {
      if (err === null) {
        resTryLogIn(err, docs);
      } else {
        res.status(500).json({ message: err });
      }
    });
  } else if (number !== "null") {
    dataUsers.findOne({ number }, (err, docs) => {
      if (err === null) {
        resTryLogIn(err, docs);
      } else {
        res.status(500).json({ message: err });
      }
    });
  } else {
    res.status(501).json({ message: "Email and Number NULL" });
  }

  const resTryLogIn = (err, docs) => {
    if (err === null) {
      if (docs !== null) {
        if (docs.password === password) {
          res
            .status(200)
            .json({ message: "passwordAccepted", email: docs.email });
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
      if (docs !== null) {
        res.status(200).json(docs.password);
      } else {
        res.status(200).json({ message: "emailNotUse" });
      }
    });
  } else if (number !== "null") {
    dataUsers.findOne({ number }, (err, docs) => {
      if (docs !== null) {
        res.status(200).json(docs.password);
      } else {
        res.status(200).json({ message: "numberNotUse" });
      }
    });
  } else {
    res.status(200).json({ message: "Email and Number NULL" });
  }
};

const getUserInfo = (req, res) => {
  const { email } = req.params;
  if (email !== "null") {
    dataUsers.findOne({ email }, (err, docs) => {
      if (err === null) {
        let user = { email: docs.email, number: docs.number, id: docs._id };
        dataBoard.find({ idOwner: docs._id }, (err, docs) => {
          if (err === null) {
            res.status(200).json({
              user: user,
              boards: docs,
              completed: true,
            });
          } else {
            res.status(500).json({ error: err });
          }
        });
      } else {
        res
          .status(501)
          .json({ completed: false, message: "Email and Number NULL" });
      }
    });
  }
};

module.exports = {
  newUsers,
  tryLogIn,
  getUserInfo,
  getUserPassword,
};
