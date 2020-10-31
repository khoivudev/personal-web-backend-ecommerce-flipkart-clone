var User = require("../../models/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var shortid = require("shortid");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).then(async (user) => {
    if (user) {
      return res.status(400).json({
        error: "Admin already registed",
      });
    } else {
      const { firstName, lastName, email, password } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
        username: shortid.generate(),
        role: "admin",
      });

      _user
        .save()
        .then((data) => {
          return res.status(200).json({
            message: "Admin created successfully!",
          });
        })
        .catch((error) => {
          return res.status(400).json(error);
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
          //cookie in server
          res.cookie("token", token, { expiresIn: "1d" });

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
          return res.status(400).json({ error: "Invalid password" });
        }
      } else {
        return res.status(400).json({ error: "Something went wrong" });
      }
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

exports.signout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully!",
  });
};
