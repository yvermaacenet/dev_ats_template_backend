const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const location_controller = require("../controllers/Location_Controller");
// <!=============== Cabin ====================>

router.route("/location_add").post(auth, location_controller.post_new_location);
router.route("/get_location").get(auth, location_controller.get_location_list);

module.exports = router;
