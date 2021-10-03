const app = require("express")();
const port = parseInt(process.env.PORT, 10) || 3001;
const bodyParser = require("body-parser");
const cors = require("cors");

// const fileUpload = require("express-fileupload");
// const morgan = require("morgan");
// const _ = require("lodash");
// const express = require("express/lib/express");



const users = require("./database/requests/users");
const boards = require("./database/requests/boards");
const tasks = require("./database/requests/tasks");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(
    fileUpload({
      createParentPath: true
    })
);

//users

app.post("/api/createUser", users.newUsers);
app.get("/api/tryLogIn/:email/:number/:password", users.tryLogIn);
app.get("/api/getUserPassword/:email/:number", users.getUserPassword);
app.get("/api/getUserInfo/:email", users.getUserInfo);

//boards

app.get("/api/getBoards/:idUser", boards.getBoards);
app.get("/api/getBoard/:idBoard", boards.getBoard);
app.post("/api/newBoard", boards.newBoard);
app.put("/api/renameBoard", boards.renameBoard);
//tasks

app.post("/api/newTask", tasks.newTask);
app.get("/api/getTasks/:idBoard", tasks.getTasks);
app.put("/api/editTask", tasks.editTask);
app.put("/api/renameTask", tasks.renameTask);






// app.post("/api/upload-photos", async (req, res) => {
//   const userId = req.cookies.userId;
//   try {
//     if (!req.files) {
//       res.send({
//         status: false,
//         message: "No file uploaded"
//       });
//     } else {
//       let data = [];
//

      // _.forEach(_.keysIn(req.files), async key => {
      //   let photo = req.files[key];
      //

        // photo.mv(`./uploads/${userId}/` + photo.name);
        //

        //
        // const link = `/${userId}/${photo.name}`;
        // data.push({
        //   name: photo.name,
        //   link
        // });
        // await Database.user_provider.update(
        //     { _id: userId },
        //     { $set: { avatar: link } },
        //     { multi: true }
        // );
      // });
      //
      //
      // res.send({
      //   status: true,
      //   message: "Files are uploaded",
      //   data: data
      // });
    // }
  // } catch (err) {
  //   res.status(500).send(err);
  // }
// });

//make uploads directory static
app.use("/api/files", express.static("uploads"));


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
