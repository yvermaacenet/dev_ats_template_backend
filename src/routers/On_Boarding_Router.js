const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const on_boarding_controller = require("../controllers/On_Boarding_Controllers");
// <!===============On Boarding  ====================>
router
  .route("/on_boarding/:_id")
  .post(auth, on_boarding_controller.post_on_boarding);
router
  .route("/on_boarding/:_id")
  .get(auth, on_boarding_controller.get_on_boarding_by_id);
router.route("/on_boarding").get(auth, on_boarding_controller.get_on_boarding);
router
  .route("/on_boarding/:_id")
  .put(auth, on_boarding_controller.update_on_boarding);

module.exports = router;
