const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const Email_Controller = require("../controllers/Email_Controller");
// <!===============On Boarding  ====================>
router.route("/email").post(Email_Controller.Email_Controller);
router.route("/status_email").post(Email_Controller.Email_Status_Controller);

module.exports = router;
