const app = require("express")();
const port = parseInt(process.env.PORT, 10) || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const users_provider = require("./database/requests/users");
const tables_provider = require("./database/requests/tables");
const tasks_provider = require("./database/requests/tasks");

app.post("/api/createUser", users_provider.newUsers);
app.get("/api/getUser", users_provider.getUsers);

