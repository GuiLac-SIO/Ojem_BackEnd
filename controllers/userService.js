const pool = require('../config/config')


module.exports.getUser = () => {
    pool.query(
        `SELECT * FROM user WHERE use_id = 2; `,
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server 
        }
    );
}


module.exports.login = async (req, res) => {
    try {

        return pool.query(`SELECT * FROM user WHERE use_mail = '${req.body.email}' AND use_mdp = '${req.body.password}'`).then((res) => {
            console.log("------", res[0]);
            return res[0]
        })
            .catch((error) => {
                console.log("------", error);
                return false;
            })


        // if (results.length > 0) {

        //     console.log("Connexion réussie!"); 
        //     return results;
        // } else {
        //     console.log("Email ou mot de passe incorrect");

        //     return null
        // }
    } catch (error) {
        console.error(error);
    }

};

const jwt = require('jsonwebtoken');

module.exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY || 'default-secret-key', {
        expiresIn: '1h'
    });
};


module.exports.inscription =  (req, res) => {

    try { 
          return pool.query(`INSERT INTO user (use_nom, use_prenom, use_sexe, use_date_naissance, use_mail, use_date_inscription, use_photo,use_mdp, use_token, use_removed, use_salte) 
          VALUES ('${req.body.nom}','${req.body.prenom}','${req.body.sexe}','${req.body.datenaissance}','${req.body.email}','${req.body.inscription}',
          '${req.body.photo}', '${req.body.password}',' ${req.body.token}', '${req.body.removed}',  '${req.body.salte}') `).then((res) => { 
            return true;
        })
            .catch((error) => {
                console.log("------", error);
                return false;
            });
  
    }
    catch (error) { 
        console.error(error);

    }
}


module.exports.inscriptionEnfant =  (req, res) => {

    try {  console.log('AJOUTER');
          return pool.query(`INSERT INTO enfant (enf_nom, enf_prenom, enf_sexe, enf_date_naissance, enf_removed, enf_use_id ) 
          VALUES ('${req.body.nom}','${req.body.prenom}','${req.body.sexe}','${req.body.datenaissance}','${req.body.removed}', '${req.body.use_id}')`
          ).then((res) => { 
            return true;
           
        })
            .catch((error) => {
                console.log("------", error);
                return false;
            });
  
    }
    catch (error) { 
        console.error(error);

    }
}