const app = require("express")();
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
const port = parseInt(process.env.PORT, 10) || 3002;
const cors = require("cors");

const db = require("./queries/queries");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(cookieParser());

app.post("/api/createUser", db.createUser);

app.get("/api/getUsers", db.getUsers);

app.get("/api/addCookie", (req, res) => {
  res.cookie("userId", 123);
  res.status(200).json({
    message: "Куки есть",
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
