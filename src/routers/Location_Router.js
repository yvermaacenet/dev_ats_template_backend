const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const location_controller = require("../controllers/Location_Controller");
// <!=============== Cabin ====================>

router.route("/location_add").post(location_controller.post_new_location);
router.route("/get_location").get(location_controller.get_location_list);
// router
//   .route("/cabin_update/:_id")
//   .put(auth, cabin_controller.update_cabin_list);
// router.route("/cabin_list").get(auth, cabin_controller.get_cabin_list);
// router
//   .route("/active_cabin_list")
//   .get(auth, cabin_controller.get_active_cabin_list);

module.exports = router;
