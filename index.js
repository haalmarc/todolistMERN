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
const remoteUrl = "";
const dbName = "todoDB";

// Connect to database, either local or remote
mongoose.connect(`${localUrl}${dbName}`, {
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

// API-endpoint
app.get("/api/data", (req, res) => {
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
});

// TODO: Legge til postrute for å legge til todos
app.post("/api/data", (req, res) => {
  const todoName = req.body;

  const todo = new Todo({
    name: todoName,
  });

  todo.save();
  res.redirect("/");
});

// TODO: Legge til delete- rute for å slette todos

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.delete("/api/data", (req, res) => {
  const todoId = req.body;
  Todo.deleteOne({ _id: todoId }, (err) => {
    if (err) return console.log(err);
    else {
      console.log("Successfully deleted.");
      res.redirect("/");
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
