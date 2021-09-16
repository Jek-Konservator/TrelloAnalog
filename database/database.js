let Datastore = require("nedb");
let DataBase = new Datastore({ filename: "./database/sd.db", autoload: true });
DataBase.loadDatabase();

const test = (req, res) => {
  const { idUser, login, password, role } = req.body;
  DataBase.insert({ idUser, login, password, role });
  res.status(201).json({ message: "UserAdd" });
};

module.exports = {
  test,
};
