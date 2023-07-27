const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const client_project_controller = require("../controllers/Client_Project_Controller");
// <!=============== Cabin ====================>

router
  .route("/client_project")
  .get(auth, client_project_controller.client_project_controller);
router.route("/clients").get(auth, client_project_controller.client_controller);

module.exports = router;
