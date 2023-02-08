const app = require("express")(); 

const router = express.Router();

const UserRoutes = require("../controllers/user.js");
app.use(UserRoutes);

// router.post("/signup", signup);

// router.get("/private", isAuth);

// router.get("/public", (req, res, next) => {
//   res.status(200).json({ message: "here is your public resource" });
// });

// will match any other path
router.use("/", (req, res, next) => {
  res.status(404).json({ error: "page not found" });
});

// démarrage du serveur
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server Has Started on port ${process.env.PORT || 3001}`);
});


module.exports = router;