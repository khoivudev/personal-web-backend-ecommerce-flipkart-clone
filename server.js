
require("dotenv/config");
require("./config/db");
var express = require('express');

var authRoutes = require('./routes/auth');
var adminRoutes = require("./routes/admin/auth");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
  res.status(200).json({
    message: 'Hello from server'
  });
})

app.use('/api/auth', authRoutes);
app.use('/api/auth', adminRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
