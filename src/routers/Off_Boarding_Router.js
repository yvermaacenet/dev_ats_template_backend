const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const off_boarding_controller = require("../controllers/Off_Boarding_Controllers");
// <!===============On Boarding  ====================>
router
  .route("/off_boarding")
  .get(auth, off_boarding_controller.get_off_boarding);
router
  .route("/off_boarding/:_id")
  .post(auth, off_boarding_controller.post_off_boarding);
router
  .route("/off_boarding/:_id")
  .get(auth, off_boarding_controller.get_off_boarding_by_id);
router
  .route("/off_boarding/:_id")
  .put(auth, off_boarding_controller.update_off_boarding);

module.exports = router;
