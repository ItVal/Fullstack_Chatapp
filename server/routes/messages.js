const router = require("express").Router();
const auth = require("../middlewares/authorisation");
const { catchErrors } = require("../handlers/errorHandlers");
const messageController = require("../controllers/messageController");

router.post("/", auth, catchErrors(messageController.envoiMessage));
router.post("/:id", catchErrors(messageController.readMessages));
router.get("/all", catchErrors(messageController.getAllMsg));

module.exports = router;
