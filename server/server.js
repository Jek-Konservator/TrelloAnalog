const app = require("express")();
const port = parseInt(process.env.PORT, 10) || 3001;
const cors = require("cors");
const cookieParser = require("cookie-parser");




app.use(cors());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
const q_user = require("../database/database");


    app.post("/api/createUser", q_user.test);


/*const db = require("../database/database");
app.use(bodyParser.json());
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
