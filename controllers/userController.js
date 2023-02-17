const userService = require("../services/userService");
let jwt = require("jsonwebtoken");

class User {
    
  update = async (req,res) =>{
   
    const value = await userService.update(req, res);
  
    if(value){
      res.status(200).json({ value });
    }
  }

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
        
      );  
      res.status(200).json({ token });
    }
  
  };

  getUser = async(req, res) => {
    const value = await userService.getUser(req, res);
    
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

  getEnfant = async(req, res) => {
    const value = await userService.getEnfant(req, res);
    
    res.status(200).json(value);
  };
}
module.exports = User;
