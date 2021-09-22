const { dataTables } = require("../database");
const { dataUsers } = require("../database");

const getTables = (req, res) => {
  const { idUser } = req.params;
  dataUsers.findOne({ _id : idUser }, (err, docs) => {
    res.status(200).json({ array : docs.arrayTables})
  });
};

module.exports = {
  getTables,
};
