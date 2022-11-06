const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors);
app.post('/', (req, res) => {
    let Optype = computeOptype(req.body.operation_type);
    let n = computeResult(req.body, Optype);

    res.status(200).json({
        slackUsername: "Timon",
        operation_type: Optype,
        result: n
    });
});

app.listen(process.env.PORT || 5000, () => console.log("Listening on port 5000"));



// Helpers

const additionSynoms = ["+", "add", "plus", "addition", "join", "attach", "prepend", "append", "add together", "add up", "tally", "cast up"];
const subtractionSynoms = ["-", "subtract", "subtraction", "remove", "take away", "take off", "debit", "deduct", "minus"];
//const multiplicationSynoms = ["*", "multiply", "multiplication", "spread", "times"]

const computeOptype = (str) => {
  // Get the type of operation.
  if (additionSynoms.includes(str) !== -1) return 'addition';
  else if (subtractionSynoms.includes(str) !== -1) return 'subtraction';
  else return 'mulitplication'; // hopefully, this doesn't bite me in the a** :)
}

const computeResult = (json, Optype) => {
  // Get the result
  let x = parseInt(json.x);
  let y = parseInt(json.y);

  switch(Optype) {
    case 'addition':
      return (x + y);
    case 'subtraction':
      return (x - y);
    case 'multiplication':
      return (x * y);
  }
}