const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const Form_Flexible_Benefit_Controller = require("../controllers/Form_Flexible_Benefit_Controllers");
// <!===============On Boarding  ====================>
router
  .route("/form_flexi")
  .post(auth, Form_Flexible_Benefit_Controller.form_flexi_controller);
router
  .route("/form_flexilble_benefit/:_id")
  .post(
    auth,
    Form_Flexible_Benefit_Controller.update_form_flexible_benefit_controller_by_id
  );
router
  .route("/form_flexi")
  .get(auth, Form_Flexible_Benefit_Controller.get_form_flexi_controller);
router
  .route("/get_form_flexible_by_id/:_id")
  .get(auth, Form_Flexible_Benefit_Controller.get_form_flexi_controller_by_id);

module.exports = router;
