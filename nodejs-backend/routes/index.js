const express = require("express");
const AdviceController = require("../controller/AdviceController");

const router = express.Router();

router.post("/advice", AdviceController.getAdvice);

module.exports = router;
