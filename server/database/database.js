let Datastore = require("nedb");
let dataUsers = new Datastore({filename: "./datafile/users.db", autoload: true});
let dataTables = new Datastore({filename: "./datafile/tables.db", autoload: true});
let dataTasks = new Datastore({filename: "./datafile/tasks.db",autoload: true});
dataUsers.loadDatabase();
dataTables.loadDatabase();
dataTasks.loadDatabase();


module.exports = {
  dataUsers,
  dataTables,
  dataTasks,
};
