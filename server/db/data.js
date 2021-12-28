const mongoose = require("mongoose");

const db =
  "mongodb+srv://marcos:$$Marcos123@cluster0.uzy3q.mongodb.net/mernstack?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection start!");
  })
  .catch((error) => {
    console.log("error.message");
  });
