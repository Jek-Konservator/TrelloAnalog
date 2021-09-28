const { dataBoard } = require("../database");

const getBoards = (req, res) => {
  const { idUser } = req.params;
  dataBoard.find({ idOwner: idUser }, (err, docs) => {
    if (err === null) {
      res.status(200).json(docs);
    } else {
      res.status(500).json({ message: err });
    }
  });
};

const getBoard = (req, res) => {
  const { idBoard } = req.params;
  dataBoard.findOne({ _id: idBoard }, (err, docs) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(docs);
    }
  });
};

const newBoard = (req, res) => {
  const { userId } = req.body;
  dataBoard.insert({ name: "Новая доска", idOwner: userId });
  res.status(201).json({ message: "addBoards" });
};
const renameBoard = (req, res) => {
  const { name, idBoard } = req.body;
  dataBoard.update(
    { _id: idBoard },
    { $set: { name: name } },
    {},
    function (err, numReplaced) {
      if(err){
        res.status(400);
      }else{
        res.status(200).json({ message: "boardRename" });
      }
    }
  );
};

module.exports = {
  getBoards,
  getBoard,
  newBoard,
  renameBoard,
};
