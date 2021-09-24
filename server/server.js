const app = require("express")();
const port = parseInt(process.env.PORT, 10) || 3001;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


//users
const users_provider = require("./database/requests/users");

app.post("/api/createUser", users_provider.newUsers);
app.get("/api/tryLogIn/:email/:number/:password", users_provider.tryLogIn);
app.get("/api/getUserPassword/:email/:number", users_provider.getUserPassword);
app.get("/api/getUserInfo/:email", users_provider.getUserInfo);


//boards
const boards_provider = require("./database/requests/boards");

app.get("/api/getBoards/:idUser", boards_provider.getBoards);
app.get("/api/getBoard/:idBoards", boards_provider.getBoard);
app.post("/api/newBoard", boards_provider.newBoard);
//tasks
const tasks_provider = require("./database/requests/tasks");

app.post("/api/newTask", tasks_provider.newTask);
app.get("/api/getTasks:idBoard", tasks_provider.getTasks);



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
