const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const Form_Flexi_Controller = require("../controllers/Form_flexible_Controllers");
// <!===============On Boarding  ====================>
router
  .route("/form_flexi")
  .post(auth, Form_Flexi_Controller.form_flexi_controller);
router
  .route("/form_flexi")
  .get(auth, Form_Flexi_Controller.get_form_flexi_controller);
router
  .route("/get_form_flexible_by_id/:_id")
  .get(auth, Form_Flexi_Controller.get_form_flexi_controller_by_id);

module.exports = router;
