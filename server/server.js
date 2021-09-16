const app = require("express")();
const port = parseInt(process.env.PORT, 10) || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const {users_provider} = require("../database/database");


app.use(bodyParser.json());
app.use(cors());



app.post("/api/createUser", users_provider.newUsers);
/*app.get("/api/creates", q_user.testGet);*/

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

/*const db = require("../database/database");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);*/
/*app.post("/api/createUser", db.createUser);

app.get("/api/getUsers", db.getUsers);

app.get("/api/addCookie", (req, res) => {
  res.cookie("userId", 123);
  res.status(200).json({
    message: "Куки есть",
  });
});*/
