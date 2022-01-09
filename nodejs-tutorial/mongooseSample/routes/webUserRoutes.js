const express = require("express");
const { webUserController } = require("../controllers/webUserController");
const router = express.Router();


// @route  GET /admin
// @desc   Get all admins
// @access Private

router.get("/",  webUserController.getAll);


module.exports = router;