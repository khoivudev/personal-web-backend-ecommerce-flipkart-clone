
require("dotenv/config");
require("./config/db");
var express = require('express');

var usersRouter = require('./routes/api/users');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/users', usersRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
