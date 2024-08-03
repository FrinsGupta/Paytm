const express = require("express");
const app = express();
require('dotenv').config()
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT

const corsOptions = {
    origin: 'https://e-wallet-app-three.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // if you need to handle cookies or HTTP authentication
  };

app.use(cors(corsOptions))

app.use(express.json());
app.use(bodyParser.json());

const userRouter = require("./routes/user")
const accountRouter = require("./routes/account")

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});

