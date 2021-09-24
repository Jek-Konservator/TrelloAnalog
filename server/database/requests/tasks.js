const { dataTasks } = require("../database");

const newTask = (req, res) => {
  const { idBoard } = req.body;
  dataTasks.insert({ name: "Новая задача", idBoard });
  res.status(201).json({ message: "addTask" });
};

const getTasks = (req, res) => {
  const { idBoard } = req.params;
  dataTasks.find({ idBoard }, function (err, docs) {
    if (err === null) {
      res.status(200).json(docs);
    } else {
      res.status(500).json({ message: err });
    }
  });
};

module.exports = {
  newTask,
  getTasks,
};
