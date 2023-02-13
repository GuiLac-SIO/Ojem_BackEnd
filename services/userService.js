const pool = require("../config/config");


module.exports.login = async (req, res) => {
  try {
    return pool
      .query(
        `SELECT * FROM user WHERE use_mail = '${req.body.email}' AND use_mdp = '${req.body.password}'`
      )
      .then((res) => { 
        return res[0];
      })
      .catch((error) => {
        console.log("ERROR in userService -> login #789 : ", error);
        return false;
      });
  } catch (error) {
    console.log("ERROR in userService -> login #456 : ", error);
    console.error(error);
  }
};

const jwt = require("jsonwebtoken");

 
module.exports.inscription = (req, res) => {
  try {
     
    return pool
      .query(
        `INSERT INTO user (use_nom, use_prenom,  use_mail, use_date_inscription, use_mdp ) 
          VALUES ('${req.body.nom}','${req.body.prenom}','${req.body.email}','${req.body.date_inscription}',
           '${req.body.password}') `
      )
      .then((res) => {
        return true;
      })
      .catch((error) => {
        console.log("ERROR in userService -> inscription #789 : ", error);
        return false;
      });
  } catch (error) {
    console.log("ERROR in userService -> login : #456 ", error);
  }
};

module.exports.inscriptionEnfant = (req, res) => {
  try {
    console.log("AJOUTER");
    return pool
      .query(
        `INSERT INTO enfant (enf_nom, enf_prenom, enf_sexe, enf_date_naissance, enf_removed ) 
          VALUES ('${req.body.nom}','${req.body.prenom}','${req.body.sexe}','${req.body.datenaissance}','${req.body.removed}')`
      )
      .then((res) => {
        return true;
      })
      .catch((error) => {
        console.log("ERROR in userService -> inscriptionEnfant : #789 ", error);
        return false;
      });
  } catch (error) {
    console.log("ERROR in userService -> inscriptionEnfant : #456 ", error);
  }
};
