const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const documents_controller = require("../controllers/Documents_Controller");
// <!=============== Cabin ====================>

router
  .route(
    "/documents_counter/:user_id/:reporting_manager_emp_id/:acenet_role/:email"
  )
  .get(documents_controller.get_documents_counter);
router
  .route("/notifications_counter/:reporting_manager/:acenet_role")
  .get(documents_controller.get_notifications_counter);

module.exports = router;
