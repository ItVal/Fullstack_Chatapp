const router = require("express").Router();

const { catchErrors } = require("../handlers/errorHandlers");
const messageController = require("../controllers/messageController");

router.post("/", catchErrors(messageController.envoiMessage));

router.get("/all", catchErrors(messageController.getAllMsg));

module.exports = router;
