const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const Form_12_BB_Controller = require("../controllers/form_12_bb_controller");
// <!===============On Boarding  ====================>
router
  .route("/form_12_bb")
  .post(auth, Form_12_BB_Controller.form_12_bb_controller);
router
  .route("/form_12_bb/:_id")
  .put(auth, Form_12_BB_Controller.update_form_12_bb_controller_by_id);
router
  .route("/form_12_bb")
  .get(auth, Form_12_BB_Controller.get_form_12_bb_controller);
router
  .route("/get_form_12_bb_controller_by_id/:_id")
  .get(auth, Form_12_BB_Controller.get_form_12_bb_controller_by_id);

module.exports = router;
