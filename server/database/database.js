let Datastore = require("nedb");
let dataUsers = new Datastore({filename: "./server/database/datafile/users.db", autoload: true});
let dataBoard = new Datastore({filename: "./server/database/datafile/board.db", autoload: true});
let dataTasks = new Datastore({filename: "./server/database/datafile/tasks.db",autoload: true});
dataUsers.loadDatabase();
dataBoard.loadDatabase();
dataTasks.loadDatabase();


module.exports = {
  dataUsers,
  dataBoard,
  dataTasks,
};
