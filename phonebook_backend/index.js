const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token("post", function (req, res) {
  return JSON.stringify(req.body);
});

morgan.token("get", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post")
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :get")
);

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "1337",
  },
  {
    id: 3,
    name: "Robie Gonzales",
    number: "911",
  },
];

app.get("/info", (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 100) + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name/number is missing",
    });
  }

  if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
