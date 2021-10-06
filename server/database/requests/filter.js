const { dataUsers, dataTasks } = require("../database");

const newHashtag = (req, res) => {
  const { hashtag, idUser } = req.body;
  dataUsers.findOne({ _id: idUser }, function (err, docs) {
    let userHashtags = docs.hashtags;
    if (userHashtags.includes(hashtag)) {
      res.status(200).json({ message: "hashtagUse" });
    } else {
      userHashtags.push(hashtag);
      dataUsers.update({ _id: idUser }, { $set: { hashtags: userHashtags } });
      res.status(200).json({ message: "addNewHashtag" });
    }
  });
};

const editTaskHashtags = (req, res) => {
  const { id, hashtags } = req.body;
  dataTasks.update(
    { _id: id },
    { $set: { hashtags } },
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

const getTasksHashtag = (req, res) => {
  //баг порядок тэгов имеет значение(((
  let { taskHashtags, idBoard } = req.params;
  taskHashtags = taskHashtags.split(",").map((e) => {
    return { hashtags: e };
  });
  dataTasks.find({ $and: taskHashtags, idBoard }, function (err, docs) {
    res.status(200).json(docs);
  });
};

const searchTask = (req, res) => {
  //баг порядок тэгов имеет значение(((
  let { textSearch, idBoard } = req.params;
  dataTasks.find({ idBoard }, function (err, docs) {
   const searchTasts = docs.filter(
      (task) =>
        task.name.toLowerCase().indexOf(textSearch.toLowerCase()) > -1 ||
        task.description.toLowerCase().indexOf(textSearch.toLowerCase()) > -1
    );
    res.status(200).json(searchTasts);
  });
};

module.exports = {
  newHashtag,
  editTaskHashtags,
  getTasksHashtag,
  searchTask,
};
