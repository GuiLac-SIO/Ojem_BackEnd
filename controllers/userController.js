const userService = require("../services/userService");
let jwt = require("jsonwebtoken");

class User {
  login = async (req, res) => {
    const value = await userService.login(req, res);

    if (value && value.length) {
      let token = jwt.sign(
        { id: value.use_id },
        process.env.SECRET_KEY || "default-secret-key",
        { expiresIn: "1d" }
      );
      res.status(200).json({ token });
    }
  };

  getUser = (req, res) => {
    res.status(200).json({ message: "getUser est connecté !" });
  };

  inscription = async (req, res) => {
    const value = await userService.inscription(req, res);

    if (value) {
      res.status(200).json(true);
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
