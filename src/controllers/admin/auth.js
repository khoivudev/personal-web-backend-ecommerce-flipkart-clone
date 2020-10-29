var User = require("../../models/user");
var jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(200).json({
        message: "Admin already registed",
      });
    } else {
      const { firstName, lastName, email, password } = req.body;

      const _user = new User({
        firstName,
        lastName,
        email,
        password,
        username: Math.random().toString(),
        role: "admin",
      });

      _user
        .save()
        .then((data) => {
          return res.status(201).json({
            message: "Admin created successfully!",
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ message: "Something went wrong" });
        });
    }
  });
};

exports.signin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        if (user.authenticate(req.body.password) && user.role === "admin") {
          const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          const { _id, firstName, lastName, fullName, email, role } = user;
          res.status(200).json({
            token,
            user: {
              _id,
              firstName,
              lastName,
              fullName,
              email,
              role,
            },
          });
        } else {
          return res.status(400).json({ message: "Invalid password" });
        }
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ error });
    });
};
