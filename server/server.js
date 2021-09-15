const app = require("express")();
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser")
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

app.get("/api/test", (req, res) => {
  res.status(200).json({
    login: "login",
    password: "pass",
    email: "mail",
    mobile: 8800,
    id: "uuid",
    role: 0,
  });
});
app.get("/api/testcoocike", (req, res) => {
  res.cookie("userId", 123)
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get('/setcookie', (req, res) => {
  res.cookie("asd",123123,{
    maxAge: 5000,
    // expires works the same as the maxAge
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  });
  res.send("asdasdasd");
});

