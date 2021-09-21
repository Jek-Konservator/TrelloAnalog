const app = require("express")();
const port = parseInt(process.env.PORT, 10) || 3001;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const tables_provider = require("./database/requests/tables");
const tasks_provider = require("./database/requests/tasks");
//users
const users_provider = require("./database/requests/users");

app.post("/api/createUser", users_provider.newUsers);
app.get("/api/tryLogIn/:email/:number/:password", users_provider.tryLogIn);
app.get("/api/getUserPassword/:email/:number", users_provider.getUserPassword);
app.get("/api/getUserInfo/:email", users_provider.getUserInfo);
//tables

//tasks

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
