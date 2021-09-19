const app = require("express")();
const port = parseInt(process.env.PORT, 10) || 3001;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());



const users_provider = require("./database/requests/users");
const tables_provider = require("./database/requests/tables");
const tasks_provider = require("./database/requests/tasks");


app.post("/api/createUser", users_provider.newUsers);
app.get("/api/getUsersNumber", users_provider.getUsersNumber);
app.get("/api/getUsersEmail", users_provider.getUsersEmail);
app.get(
  "/api/getUsersPasswordEmail/:email",
  users_provider.getUsersPasswordEmail
);
app.get(
  "/api/getUsersPasswordNumber/:number",
  users_provider.getUsersPasswordNumber
);





// TODO: правлиьность написания всех переменных на русском и инглише




app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});