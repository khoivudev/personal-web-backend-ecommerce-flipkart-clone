
require("dotenv/config");
require("./config/db");
var express = require('express');

var userRouter = require('./routes/user');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
  res.status(200).json({
    message: 'Hello from server'
  });
})

app.use('/api/user', userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
