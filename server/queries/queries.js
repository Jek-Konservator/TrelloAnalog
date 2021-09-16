/*
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "notesDB",
  password: "dxomai1354",
  port: "5432",
});

const getUsers = (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.log(error);
    }
    res.status(200).send(results.rows);
  });
};

const createUser = (req, res) => {
  const { idUser, login, password, role } = req.body;
  console.log(req.body);
  //   {
  //       "idUser": "a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  //       "login": "olewak40",
  //       "password": "1232451742!@rfw",
  //       "role": "Admin"
  //   }
  pool.query(
    "INSERT INTO users  VALUES ($1, $2, $3, $4)",
    [idUser, login, password, role],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.status(201).send(`User added to database`);
    }
  );
};


module.exports = {
  getUsers,
  createUser,
};
*/
