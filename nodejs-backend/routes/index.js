const express = require("express");
const AdviceController = require("../controller/AdviceController");
const authMiddleware = require("../middleware/auth");
const AuthRoutes = require("./routes/auth");
const router = express.Router();


app.use("/api/auth", AuthRoutes);
router.post("/advice", authMiddleware, AdviceController.getAdvice);

module.exports = router;
