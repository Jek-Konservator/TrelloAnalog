const { dataTasks, dataBoard } = require("../database");

const newTask = (req, res) => {
  const { idBoard } = req.body;
  dataTasks.insert({
    name: "Новая задача",
    task: "",
    idBoard,
    time: new Date().getTime(),
  });
  res.status(201).json({ message: "addTask" });
};

const editTask = (req, res) => {
  const { id, taskText } = req.body;
  dataTasks.update(
    { _id: id },
    { $set: { task: taskText } },
    {},
    function (err, numReplaced) {
      if (err) {
        res.status(400);
      } else {
        res.status(201).json({ message: "editTask" });
      }
    }
  );
};

const renameTask = (req, res) => {
  const { name, id } = req.body;
  dataTasks.update(
    { _id: id },
    { $set: { name: name } },
    {},
    function (err, numReplaced) {
      if (err) {
        res.status(400);
      } else {
        res.status(200).json({ message: "TaskRename" });
      }
    }
  );
};

const getTasks = (req, res) => {
  const { idBoard } = req.params;
  const query = req.query;
  console.log(query);
  dataTasks.find(
    {
      idBoard,
    },
    function (err, docs) {
      if (err) {
        res.status(400);
      } else {
        res.status(200).json(docs);
      }
    }
  );
};

module.exports = {
  newTask,
  getTasks,
  editTask,
  renameTask,
};
