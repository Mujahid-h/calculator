const express = require("express");
const bodyParser = require("body-parser");
const math = require("mathjs");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/calculate", (req, res) => {
  try {
    const expression = req.body.expression;
    if (!expression) {
      res.status(400).json({ error: "Expression is required" });
      return;
    }

    const result = calculateExpression(expression);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Error calculating expression" });
  }
});

function calculateExpression(expression) {
  try {
    return math.evaluate(expression).toString();
  } catch (error) {
    throw error;
  }
}

// Static Files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
