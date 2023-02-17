
const userController = require('../controllers/userController');
// const app = require('express')();
const bodyParser = require('body-parser')
const router = require('express').Router(); 
const user = new userController()
const auth = require('../middleware/tokenValidation')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post("/user/login", user.login );
router.post("/user/update", user.update );
router.get("/user/getUser",auth.validateToken,  user.getUser);
router.post("/user/inscription", user.inscription);
router.get("/user/getEnfant",auth.validateToken,   user.getEnfant);
router.post("/user/inscriptionEnfant", user.inscriptionEnfant);
      
         
 



module.exports = router; 