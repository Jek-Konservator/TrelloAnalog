let Datastore = require("nedb");
let dataUsers = new Datastore({filename: "./datafile/users.db", autoload: true});
let dataTables = new Datastore({filename: "./datafile/tables.db", autoload: true});
let dataTasks = new Datastore({filename: "./datafile/tasks.db",autoload: true});

dataUsers.loadDatabase();
dataTables.loadDatabase();
dataTasks.loadDatabase();

const users_provider = require("./requests/users");
const tables_provider = require("./requests/tables");
const tasks_provider = require("./requests/tasks");

module.exports = {
  dataUsers,
  dataTables,
  dataTasks,
  users_provider,
  tables_provider,
  tasks_provider,
};

/*
const testPost = (req, res) => {
  const { idUser, login, password, role } = req.body;
  console.log(req)
  DataBase.insert({ idUser, login, password, role });
  res.status(201).json({ message: req.body });
};
const testGet = (req, res) => {
  DataBase.find({ login : "ke1_rotwavresnoK" }, (err, docs) => {
    if(err === null) {
      res.status(200).json({docs})
    } else {
      res.status(500).json({err})
    }

  });

};*/
