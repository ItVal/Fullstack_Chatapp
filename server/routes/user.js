const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const userController = require("../controllers/userController");

router.get("/all", catchErrors(userController.getAllUsers))
router.post("/login", catchErrors(userController.login));
router.post("/register", catchErrors(userController.register));
router.get("/allmoinsun/:id", catchErrors(userController.getAllUsersMone))

module.exports = router;