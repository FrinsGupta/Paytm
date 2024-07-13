const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());

const paytmRouter = require("./routes")

app.use("/",paytmRouter);

app.listen(3000);

