const { dataTables } = require("../database");
const { dataUsers } = require("../database");

const getTables = (req, res) => {
  const { idUser } = req.params;
  dataUsers.findOne({ _id: idUser }, (err, docs) => {
    res.status(200).json({ array: docs.arrayTables });
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
  dataTables.insert(
    { name: "Новая доска", arrayTask: [] },
    function (err, docs) {
      if (err === null) {
        dataUsers.update({ _id: userId }, { $push: { arrayTables: docs._id } });
        res.status(201).json({ message: "AddTable" });
      } else {
        res.status(20).json({ err });
      }
    }
  );
};

module.exports = {
  getTables,
  newTable,
  getTable,
};
