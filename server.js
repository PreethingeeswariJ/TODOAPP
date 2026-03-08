
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let todos = [];

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// ADD todo
app.post("/todos", (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: "Text required" });

  const todo = {
    id: Date.now(),
    text,
    completed: false
  };

  todos.push(todo);
  res.json(todo);
});

// UPDATE todo
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  if (req.body.text !== undefined) todo.text = req.body.text;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;

  res.json(todo);
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id !== Number(req.params.id));
  res.json({ success: true });
});

app.listen(3004, () =>
  console.log("✅ Server running at http://localhost:3004")
);
