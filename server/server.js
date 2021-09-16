const app = require("express")();
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
const port = parseInt(process.env.PORT, 10) || 3002;
const cors = require("cors");
const database = require("../database/database");


app.use(cors());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.post("/api/createUser", database.Datastore.insert({ field1: 'field1Value'
  , field2: 5
  , field3: new Date()
  , field4: true
  , field5: null
  , notToBeSaved: undefined
}));


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
