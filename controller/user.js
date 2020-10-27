var User = require('../models/User');

exports.signup = (req, res, next) =>{
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