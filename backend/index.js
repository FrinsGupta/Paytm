const express = require("express");
const app = express();
require('dotenv').config()
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT

app.use(cors())

app.use(express.json());
app.use(bodyParser.json());

const userRouter = require("./routes/user")
const accountRouter = require("./routes/account")

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});

