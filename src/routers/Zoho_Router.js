const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const zoho_controller = require("../controllers/Zoho_Controllers.js");
// <!=============== Login & Logout ====================>

router.route("/sign_in_zoho").get(zoho_controller.sign_in_zoho);
router
  .route("/sign_in_zoho_get_access_token/:code")
  .post(zoho_controller.sign_in_zoho_get_access_token);
router.route("/get_zoho_data").get(auth, zoho_controller.get_zoho_data);
router
  .route("/compare_data_between_zoho_and_database")
  .post(auth, zoho_controller.compare_data_between_zoho_and_database);
module.exports = router;
