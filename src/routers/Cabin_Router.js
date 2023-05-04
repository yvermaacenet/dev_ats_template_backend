const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const cabin_controller = require("../controllers/Cabin_Controllers");
// <!=============== Cabin ====================>

router.route("/cabin_add").post(auth, cabin_controller.post_cabin_list);
router
  .route("/cabin_list_by_id/:_id")
  .get(auth, cabin_controller.get_cabin_list_by_id);
router
  .route("/cabin_update/:_id")
  .put(auth, cabin_controller.update_cabin_list);
router.route("/cabin_list").get(auth, cabin_controller.get_cabin_list);
router
  .route("/active_cabin_list")
  .get(auth, cabin_controller.get_active_cabin_list);

module.exports = router;
