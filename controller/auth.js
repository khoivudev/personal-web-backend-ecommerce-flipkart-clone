var User = require('../models/user');
var jwt = require('jsonwebtoken');

exports.signup = (req, res) =>{
  User.findOne({email: req.body.email})
  .then( user =>{
    if(user){
      return res.status(200).json({
        message: 'User already registed'
      });
    }else{
      const {
        firstName, 
        lastName,
        email,
        password
      } = req.body;
      
      const _user = new User({
        firstName, 
        lastName, 
        email, 
        password,
        username: Math.random().toString() 
      });
  
      _user.save()
      .then(data=>{
        return res.status(201).json({
          message: 'User created successfully!'
        })
      })
      .catch(err=> {
        console.log(err);
        return res.status(400).json({message: "Something went wrong"});
      });
     
    }})
}

exports.signin = (req, res, next)=>{
  User.findOne({email: req.body.email})
  .then(user=>{
    if(user){
      if(user.authenticate(req.body.password)){
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        const { _id, firstName, lastName, fullName, email, role } = user;
        res.status(200).json({
          token,
          user:{
            _id, firstName, lastName, fullName, email, role
          }
        })
      }else{
        return res.status(400).json({message: "Invalid password"});
      } 
    }else{
      return res.status(400).json({message: "Something went wrong"});
    }
  })
  .catch(err=> {
    return res.status(400).json({error});
  })
}

exports.requireSignin = (req, res, next) =>{
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
}