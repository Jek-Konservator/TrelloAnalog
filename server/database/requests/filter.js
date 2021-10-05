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
  let { taskHashtags } = req.params;
  dataTasks.find({ hashtags: taskHashtags }, function (err, docs) {
    if (err) {
      res(400);
    } else {
      if (docs.length === 0) {
        taskHashtags = taskHashtags.split(",");
        dataTasks.find({ hashtags: taskHashtags }, function (err, docs) {
          if (err) {
            res(400);
          } else {
            res.status(200).json(
              docs.sort(function (a, b) {
                return a.time > b.time ? -1 : a.time < b.time ? 1 : 0;
              })
            );
          }
        });
      } else {
        res.status(200).json(
          docs.sort(function (a, b) {
            return a.time > b.time ? -1 : a.time < b.time ? 1 : 0;
          })
        );
      }
    }
  });
};

module.exports = {
  newHashtag,
  editTaskHashtags,
  getTasksHashtag,
};
