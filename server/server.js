const app = require("express")();
const port = parseInt(process.env.PORT, 10) || 3001;
const bodyParser = require("body-parser");
const cors = require("cors");

const users = require("./database/requests/users");
const boards = require("./database/requests/boards");
const tasks = require("./database/requests/tasks");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//users

app.post("/api/createUser", users.newUsers);
app.get("/api/tryLogIn/:email/:number/:password", users.tryLogIn);
app.get("/api/getUserPassword/:email/:number", users.getUserPassword);
app.get("/api/getUserInfo/:email", users.getUserInfo);

//boards

app.get("/api/getBoards/:idUser", boards.getBoards);
app.get("/api/getBoard/:idBoard", boards.getBoard);
app.post("/api/newBoard", boards.newBoard);
//tasks

app.post("/api/newTask", tasks.newTask);
app.get("/api/getTasks/:idBoard", tasks.getTasks);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
