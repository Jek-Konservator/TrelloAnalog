const { dataTasks, dataBoard } = require("../database");

const newTask = (req, res) => {
  const { idBoard } = req.body;
  dataTasks.insert({ name: "Новая задача", task: "", idBoard });
  res.status(201).json({ message: "addTask" });
};
const editTask = (req, res) => {
  const { id, taskText } = req.body;
  dataTasks.update(
    { _id: id },
    { $set: { task: taskText } },
    {},
    function (err, numReplaced) {}
  );
  res.status(201).json({ message: "editTask" });
};

const renameTask = (req, res) => {
  const { name, id } = req.body;
  dataTasks.update(
    { _id: id },
    { $set: { name: name } },
    {},
    function (err, numReplaced) {}
  );
  res.status(200).json({ message: "TaskRename" });
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
  editTask,
  renameTask,
};
