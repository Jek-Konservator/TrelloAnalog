const { dataTables } = require("../database");
const { dataUsers } = require("../database");

const getTables = (req, res) => {
  const { idUser } = req.params;
  dataTables.find({ idOwner: idUser }, (err, docs) => {
    res.status(200).json( docs );
  });
};

const getTable = (req, res) => {
  const { idTable } = req.params;
  dataTables.findOne({ _id: idTable }, (err, docs) => {
    res.status(200).json({ nameTable: docs.name, array: docs.arrayTask });
  });
};

const newTable = (req, res) => {
  const { userId } = req.body;
  dataTables.insert({ name: "Новая доска", idOwner: userId });
  res.status(201).json({ message: "addTables" });
};

module.exports = {
  getTables,
  newTable,
  getTable,
};
