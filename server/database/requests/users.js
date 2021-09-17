const { dataUsers } = require("../database");

const newUsers = (req, res) => {
  const { login, password, role } = req.body;
  dataUsers.insert({ login, password, role });
  res.status(201).json({ message: "AddUsers" });
};
const getUsers = (req, res) => {
  dataUsers.findOne({ login: "ke1_rotwavresnoK" }, (err, docs) => {
    if (err === null) {
      res.status(200).json({ docs });
    } else {
      res.status(500).json({ err });
    }
  });
};

module.exports = {
  newUsers,
  getUsers,
};
