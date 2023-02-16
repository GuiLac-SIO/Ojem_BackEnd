const pool = require("../config/config");


module.exports.login = async (req, res) => {
  try {
    return pool
      .query(
        `SELECT * FROM user WHERE use_mail = '${req.body.email}' AND use_mdp = '${req.body.password}'`
      )
      .then((res) => {
       
         if(res[0].length == 0) {
          return false
         }
         else{
        return res[0];}
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


// module.exports.inscription = (req, res) => {
//   try {

//     return pool
//       .query(
//         `INSERT INTO user (use_nom, use_prenom,  use_mail, use_date_inscription, use_mdp ) 
//           VALUES ('${req.body.nom}','${req.body.prenom}','${req.body.email}','${req.body.date_inscription}',
//            '${req.body.password}') `
//       )
//       .then((res) => {
//         return true;
//       })
//       .catch((error) => {
//         console.log("ERROR in userService -> inscription #789 : ", error);
//         return false;
//       });
//   } catch (error) {
//     console.log("ERROR in userService -> login : #456 ", error);
//   }
// };
module.exports.inscription = (req, res) => {
  try {
    return pool
      .query(`SELECT 1 FROM user WHERE use_mail = '${req.body.email}'`)
      .then((selectResult) => {
        
         
        if (selectResult[0].length > 0) {
          // L'utilisateur existe déjà, retourner false
          return false;
        } 
        else {
          // L'utilisateur n'existe pas encore, effectuer l'insertion
          return pool.query(
            `INSERT INTO user (use_nom, use_prenom, use_mail, use_date_inscription, use_mdp)
             VALUES ('${req.body.nom}', '${req.body.prenom}', '${req.body.email}',
                     '${req.body.date_inscription}', '${req.body.password}')`
          ).then((insertResult) => {
            return true;
          }).catch((insertError) => {
            console.log("ERROR in userService -> inscription (insert) : ", insertError);
            return false;
          });
        }
      })
      .catch((selectError) => {
        console.log("ERROR in userService -> inscription (select) : ", selectError);
        return false;
      });
  } catch (error) {
    console.log("ERROR in userService -> inscription : ", error);
    return false;
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

module.exports.getUser = (req, res) => {
  
  const { decodedJwtToken } = req;
  
  return   pool.query(`SELECT use_nom, use_prenom,use_sexe,use_date_naissance, use_mail, use_date_inscription, use_photo FROM user WHERE use_id = '${decodedJwtToken.id}'`) 
  .then((res) => {
     return res [0]
  })
  .catch((error) => {
    console.log("ERROR in userService -> inscriptionEnfant : #789 ", error);
    return false;
  });

}
