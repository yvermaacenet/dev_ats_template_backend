const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const airport_controller = require("../controllers/Airport_Controller");
// <!=============== Cabin ====================>

router.route("/airport").get(airport_controller.get_airport);

module.exports = router;
