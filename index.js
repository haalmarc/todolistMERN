const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Set up database
const localUrl = "mongodb://localhost:27017/";
const remoteUrl = `mongodb+srv://${process.env.todolistUser}:${process.env.todolistPW}@todolistcluster.cnori.mongodb.net/`;
const dbName = "todoDB";

// Connect to database, either local or remote
mongoose.connect(`${remoteUrl}${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Data-schema
const todosSchema = {
  name: String,
};

// Model
const Todo = mongoose.model("Todo", todosSchema);

// Default items
const todo1 = new Todo({
  name: "First todo",
});

const todo2 = new Todo({
  name: "Second todo",
});

const defaultItems = [todo1, todo2];

app
  .route("/api/data")

  .get((req, res) => {
    // Add default items if empty, else display earlier entries.
    // Read
    Todo.find({}, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        if (results.length === 0) {
          // Update
          Todo.insertMany(defaultItems, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Successfully added default items to database.");
            }
          });
          res.redirect("/api/data");
        } else {
          res.json(results);
        }
      }
    });
  })

  .post((req, res) => {
    const todoName = req.body;

    const todo = new Todo({
      name: todoName,
    });

    todo.save();
  });

app.delete("/api/data/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  Todo.deleteOne({ _id: todoId }, (err) => {
    if (err) return console.log(err);
    else {
      console.log("Successfully deleted.");
    }
  });
});

// Catch-all-handler: For requests som ikke passer med andre ruter.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
