let Datastore = require("nedb");
let dataUsers = new Datastore({filename: "./server/database/datafile/users.db", autoload: true});
let dataTables = new Datastore({filename: "./server/database/datafile/tables.db", autoload: true});
let dataTasks = new Datastore({filename: "./server/database/datafile/tasks.db",autoload: true});
dataUsers.loadDatabase();
dataTables.loadDatabase();
dataTasks.loadDatabase();


module.exports = {
  dataUsers,
  dataTables,
  dataTasks,
};
