const userService = require("../services/userService");
let jwt = require("jsonwebtoken");

class User {
  login = async (req, res) => {
    const value = await userService.login(req, res);
   if(!value){
    res.status(200).json(value);
   } 
    else{
      let token = jwt.sign(
        { id: value[0].use_id },
        process.env.SECRET_KEY || "default-secret-key",
        {  expiresIn: '1h' }
        
      );  console.log(token);
      res.status(200).json({ token });
    }
  
  };

  getUser = async(req, res) => {
    const value = await userService.getUser(req, res);
    console.log('BBBBBBBB',value)
    res.status(200).json(value);
  };

  inscription = async (req, res) => {
    const value = await userService.inscription(req, res);

    if (value) {
      res.status(200).json(true);
    }
    else{
      res.status(200).json(false)
    }
  };

  inscriptionEnfant = async (req, res) => {
    const value = await userService.inscriptionEnfant(req, res);

    if (value) {
      res.status(200).json(true);
    }
  };
}
module.exports = User;
